import type { Component } from 'solid-js';
import { Show, onCleanup, onMount, createSignal } from 'solid-js';
import './Modal.css';

interface ModalProps {
  fish: any;
  onClose: () => void;
}

export const Modal: Component<ModalProps> = (props) => {
  let modalRef: HTMLDivElement | undefined;
  let overlayRef: HTMLDivElement | undefined;

  const [currentImageIndex, setCurrentImageIndex] = createSignal(0);

  const nextImage = () => {
    if (Array.isArray(props.fish.ImageGallery) && props.fish.ImageGallery.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % props.fish.ImageGallery.length);
    }
  };

  const prevImage = () => {
    if (Array.isArray(props.fish.ImageGallery) && props.fish.ImageGallery.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + props.fish.ImageGallery.length) % props.fish.ImageGallery.length);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      props.onClose();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef && !modalRef.contains(event.target as Node)) {
      props.onClose();
    }
  };

  onMount(() => {
    window.addEventListener('keyup', handleKeyUp);
    document.addEventListener('mousedown', handleClickOutside);
    // Add class to trigger transition
    if (overlayRef) {
      overlayRef.classList.add('show');
    }
  });

  onCleanup(() => {
    window.removeEventListener('keyup', handleKeyUp);
    document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <div class="modal-overlay" ref={overlayRef}>
      <div class="modal-content" ref={modalRef}>
        <button class="modal-close" onClick={props.onClose} title="Close">×</button>
        <Show when={props.fish}>
          {(fish) => (
            <>
              <h2>{fish().SpeciesName}</h2>

              <div class="modal-body">
                <div class="carousel">
                  <Show when={Array.isArray(fish().ImageGallery) && fish().ImageGallery.length > 0}>
                    <div class="carousel-inner">
                      <button class="carousel-arrow prev" onClick={prevImage} title="Previous image">&lt;</button>
                      <Show when={fish().ImageGallery.length > 0} fallback={<p>Loading fish image..</p>}>
                        <img
                          src={fish().ImageGallery[currentImageIndex()].src}
                          alt={fish().ImageGallery[currentImageIndex()].alt}
                          title={fish().ImageGallery[currentImageIndex()].alt} />
                      </Show>
                      <button class="carousel-arrow next" onClick={nextImage} title="Next image">&gt;</button>
                    </div>
                  </Show>
                </div>

                <div class="fish-info">
                  <h3>Biology</h3>
                  <p innerHTML={fish().Biology || 'N/A'}></p>

                  <h3>Location</h3>
                  <p innerHTML={fish().Location || 'N/A'}></p>
                </div>
              </div>
            </>
          )}
        </Show>
      </div>
    </div>
  );
};
