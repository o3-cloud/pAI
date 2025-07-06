class PodcastPlayer {
    constructor() {
        this.currentEpisodeIndex = 0;
        this.playlist = null;
        this.isPlaying = false;
        this.audio = document.getElementById('audio-element');
        this.audioSource = document.getElementById('audio-source');
        
        this.initializeElements();
        this.loadPlaylist();
        this.setupEventListeners();
    }

    initializeElements() {
        this.playPauseBtn = document.getElementById('play-pause-btn');
        this.playIcon = document.querySelector('.play-icon');
        this.pauseIcon = document.querySelector('.pause-icon');
        this.progressBar = document.querySelector('.progress-bar');
        this.progressFill = document.getElementById('progress-fill');
        this.currentTimeDisplay = document.getElementById('current-time');
        this.totalTimeDisplay = document.getElementById('total-time');
        this.volumeBtn = document.getElementById('volume-btn');
        this.volumeSlider = document.getElementById('volume-slider');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.episodeCounter = document.getElementById('episode-counter');
        this.episodeTitle = document.getElementById('episode-title');
        this.episodeDescription = document.getElementById('episode-description');
        this.episodeSummary = document.getElementById('episode-summary');
        this.episodeTranscript = document.getElementById('episode-transcript');
        this.episodeList = document.getElementById('episode-list');
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
    }

    async loadPlaylist() {
        try {
            const response = await fetch('.reporadio/onboarding/episodes/playlist.json');
            const data = await response.json();
            this.playlist = data.playlist;
            this.renderPlaylist();
            this.loadEpisode(0);
        } catch (error) {
            console.error('Error loading playlist:', error);
            this.showError('Failed to load playlist');
        }
    }

    renderPlaylist() {
        this.episodeList.innerHTML = '';
        this.playlist.episodes.forEach((episode, index) => {
            const episodeItem = document.createElement('div');
            episodeItem.className = 'episode-item';
            episodeItem.innerHTML = `
                <div class="episode-number">${index + 1}</div>
                <h4>${episode.title}</h4>
                <p>${episode.description}</p>
            `;
            episodeItem.addEventListener('click', () => this.loadEpisode(index));
            this.episodeList.appendChild(episodeItem);
        });
    }

    async loadEpisode(index) {
        if (!this.playlist || index < 0 || index >= this.playlist.episodes.length) {
            return;
        }

        const episode = this.playlist.episodes[index];
        this.currentEpisodeIndex = index;

        // Update UI
        this.episodeTitle.textContent = episode.title;
        this.episodeDescription.textContent = episode.description;
        this.episodeSummary.textContent = episode.summary;
        this.episodeCounter.textContent = `${index + 1} / ${this.playlist.episodes.length}`;

        // Update navigation buttons
        this.prevBtn.disabled = index === 0;
        this.nextBtn.disabled = index === this.playlist.episodes.length - 1;

        // Update playlist visual
        document.querySelectorAll('.episode-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        // Load audio
        this.audioSource.src = `.reporadio/onboarding/episodes/${episode.audioFile}`;
        this.audio.load();

        // Load transcript
        await this.loadTranscript(episode.transcriptFile);

        // Reset player state
        this.isPlaying = false;
        this.updatePlayPauseButton();
        this.progressFill.style.width = '0%';
        this.currentTimeDisplay.textContent = '0:00';
    }

    async loadTranscript(transcriptFile) {
        try {
            const response = await fetch(`.reporadio/onboarding/episodes/${transcriptFile}`);
            const text = await response.text();
            this.episodeTranscript.innerHTML = this.formatTranscript(text);
        } catch (error) {
            console.error('Error loading transcript:', error);
            this.episodeTranscript.textContent = 'Transcript not available';
        }
    }

    formatTranscript(markdown) {
        // Simple markdown parsing for basic formatting
        return markdown
            .replace(/^# (.+)$/gm, '<h1>$1</h1>')
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/\[(.+?)\]/g, '<strong>$1</strong>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(.+)$/gm, '<p>$1</p>')
            .replace(/<p><\/p>/g, '')
            .replace(/<p>(<h[1-6]>)/g, '$1')
            .replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    }

    setupEventListeners() {
        // Play/Pause button
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());

        // Audio events
        this.audio.addEventListener('loadedmetadata', () => {
            this.totalTimeDisplay.textContent = this.formatTime(this.audio.duration);
        });

        this.audio.addEventListener('timeupdate', () => {
            if (this.audio.duration) {
                const progress = (this.audio.currentTime / this.audio.duration) * 100;
                this.progressFill.style.width = `${progress}%`;
                this.currentTimeDisplay.textContent = this.formatTime(this.audio.currentTime);
            }
        });

        this.audio.addEventListener('ended', () => {
            this.nextEpisode();
        });

        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
            this.updatePlayPauseButton();
        });

        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
            this.updatePlayPauseButton();
        });

        // Progress bar click
        this.progressBar.addEventListener('click', (e) => {
            const rect = this.progressBar.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = x / rect.width;
            this.audio.currentTime = percentage * this.audio.duration;
        });

        // Volume controls
        this.volumeSlider.addEventListener('input', (e) => {
            this.audio.volume = e.target.value;
            this.updateVolumeIcon();
        });

        this.volumeBtn.addEventListener('click', () => {
            this.audio.muted = !this.audio.muted;
            this.updateVolumeIcon();
        });

        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousEpisode());
        this.nextBtn.addEventListener('click', () => this.nextEpisode());

        // Tab switching
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;
            
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    this.togglePlayPause();
                    break;
                case 'ArrowLeft':
                    this.audio.currentTime = Math.max(0, this.audio.currentTime - 10);
                    break;
                case 'ArrowRight':
                    this.audio.currentTime = Math.min(this.audio.duration, this.audio.currentTime + 10);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousEpisode();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.nextEpisode();
                    break;
            }
        });
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play().catch(error => {
                console.error('Error playing audio:', error);
                this.showError('Unable to play audio');
            });
        }
    }

    updatePlayPauseButton() {
        if (this.isPlaying) {
            this.playIcon.style.display = 'none';
            this.pauseIcon.style.display = 'block';
        } else {
            this.playIcon.style.display = 'block';
            this.pauseIcon.style.display = 'none';
        }
    }

    updateVolumeIcon() {
        if (this.audio.muted || this.audio.volume === 0) {
            this.volumeBtn.textContent = '🔇';
        } else if (this.audio.volume < 0.5) {
            this.volumeBtn.textContent = '🔉';
        } else {
            this.volumeBtn.textContent = '🔊';
        }
    }

    previousEpisode() {
        if (this.currentEpisodeIndex > 0) {
            this.loadEpisode(this.currentEpisodeIndex - 1);
        }
    }

    nextEpisode() {
        if (this.currentEpisodeIndex < this.playlist.episodes.length - 1) {
            this.loadEpisode(this.currentEpisodeIndex + 1);
        }
    }

    switchTab(tabName) {
        this.tabButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.tab === tabName);
        });

        this.tabContents.forEach(content => {
            content.classList.toggle('active', content.id === `${tabName}-content`);
        });
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Initialize the player when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PodcastPlayer();
});