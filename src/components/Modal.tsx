import type { Component } from 'solid-js';
import { Show, onCleanup, onMount, createSignal } from 'solid-js';
import type { Fish } from '../types'; // Import the new Fish type
import './Modal.css';

interface ModalProps {
  fish: Fish;
  onClose: () => void;
}

const KEY_ESCAPE = 'Escape';
const EVENT_KEYUP = 'keyup';
const EVENT_MOUSEDOWN = 'mousedown';

/**
 * @description A modal component that displays detailed information about a fish, including an image carousel.
 * @param props The properties passed to the component, including the fish to display and a close handler.
 * @returns The modal component.
 */
export const Modal: Component<ModalProps> = (props) => {
  let modalRef: HTMLDivElement | undefined;

  const [currentImageIndex, setCurrentImageIndex] = createSignal(0);
  const [isModalVisible, setIsModalVisible] = createSignal(false);

  const imageGallery = () => props.fish.ImageGallery;
  const hasImages = () => Array.isArray(imageGallery()) && imageGallery().length > 0;

  const nextImage = () => {
    if (hasImages()) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageGallery().length);
    }
  };

  const prevImage = () => {
    if (hasImages()) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageGallery().length) % imageGallery().length);
    }
  };

  // Close the modal if the Escape key is pressed
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === KEY_ESCAPE) {
      props.onClose();
    }
  };

  // Close the modal if a click occurs outside of the modal content
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef && !modalRef.contains(event.target as Node)) {
      props.onClose();
    }
  };

  onMount(() => {
    window.addEventListener(EVENT_KEYUP, handleKeyUp);
    document.addEventListener(EVENT_MOUSEDOWN, handleClickOutside);
    // Trigger the transition after the component has mounted
    setIsModalVisible(true);
  });

  onCleanup(() => {
    window.removeEventListener(EVENT_KEYUP, handleKeyUp);
    document.removeEventListener(EVENT_MOUSEDOWN, handleClickOutside);
  });

  return (
    <div class={`modal-overlay ${isModalVisible() ? 'show' : ''}`}>
      <div class="modal-content" ref={modalRef}>
        <button class="modal-close" onClick={props.onClose} title="Close">×</button>
        <Show when={props.fish} fallback={<p>Loading fish details...</p>}>
          {(fish) => (
            <>
              <h2>{fish()['Species Name']}</h2>

              <div class="modal-body">
                <div class="carousel">
                  <Show when={hasImages()} fallback={<p>No images available.</p>}>
                    <div class="carousel-inner">
                      <button class="carousel-arrow prev" onClick={prevImage} title="Previous image">‹</button>
                      <img
                        src={imageGallery()[currentImageIndex()].src}
                        alt={imageGallery()[currentImageIndex()].alt}
                        title={imageGallery()[currentImageIndex()].alt}
                      />
                      <button class="carousel-arrow next" onClick={nextImage} title="Next image">›</button>
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
