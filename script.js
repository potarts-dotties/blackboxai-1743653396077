document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const transformBtn = document.getElementById('transform-btn');
    const loadingIcon = document.getElementById('loading-icon');
    const toast = document.getElementById('toast');
    let selectedStyle = null;
    let selectedFile = null;

    // Style selection
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('bg-indigo-600', 'text-white');
                b.classList.add('bg-indigo-100', 'text-indigo-700');
            });
            this.classList.remove('bg-indigo-100', 'text-indigo-700');
            this.classList.add('bg-indigo-600', 'text-white');
            selectedStyle = this.dataset.style;
        });
    });

    // Drag and drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        dropZone.classList.add('highlight');
    }

    function unhighlight() {
        dropZone.classList.remove('highlight');
    }

    dropZone.addEventListener('drop', handleDrop, false);
    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', function() {
        if (this.files.length) {
            handleFiles(this.files);
        }
    });

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length) {
            handleFiles(files);
        }
    }

    function handleFiles(files) {
        const file = files[0];
        if (!validateFile(file)) return;
        
        selectedFile = file;
        dropZone.innerHTML = `
            <div class="flex flex-col items-center">
                <i class="fas fa-check-circle text-4xl text-green-500 mb-2"></i>
                <p class="text-gray-700 font-medium">${file.name}</p>
                <p class="text-sm text-gray-500">${(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
        `;
    }

    function validateFile(file) {
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            showToast('Only JPG/PNG files are supported');
            return false;
        }
        if (file.size > 5 * 1024 * 1024) {
            showToast('File size must be less than 5MB');
            return false;
        }
        return true;
    }

    // Transform button click handler
    transformBtn.addEventListener('click', async function() {
        if (!selectedFile) {
            showToast('Please select an image first');
            return;
        }
        if (!selectedStyle) {
            showToast('Please choose a transformation style');
            return;
        }

        loadingIcon.classList.remove('hidden');
        transformBtn.disabled = true;

        try {
            // Simulate API call (will be replaced with actual implementation)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // For demo purposes, redirect to process.html
            window.location.href = 'process.html';
        } catch (error) {
            showToast('Failed to process image. Please try again.');
        } finally {
            loadingIcon.classList.add('hidden');
            transformBtn.disabled = false;
        }
    });

    function showToast(message) {
        toast.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
});