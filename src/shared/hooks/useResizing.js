import { ref } from 'vue';
import { getVh } from '../lib/getViewPort';

const useResizing = () => {
  const isTouchRef = ref(false);
  const startYRef = ref(null);
  const newHeightRef = ref(null);
  const rangeOperation = ref(null);
  const vh = getVh();
  const handleTouchStart = (event) => {
    event.preventDefault();
    const totalHeiht = window.innerHeight;
    startYRef.value = totalHeiht - event.touches[0].clientY - vh * 7.5;
    console.log(startYRef.value);
    isTouchRef.value = true;
  };

  const handleTouchMove = (event) => {
    event.preventDefault();

    if (isTouchRef.value) {
      rangeOperation.value = newHeightRef.value - startYRef.value;
      const totalHeiht = window.innerHeight;
      const newTopHeiht = totalHeiht - event.touches[0].clientY - vh * 7.5;

      if (newTopHeiht > vh * 30 && newTopHeiht < vh * 70)
        newHeightRef.value = newTopHeiht;
    }
  };

  const handleTouchEnd = (event) => {
    event.preventDefault();
    if (Math.abs(rangeOperation.value) < 50) {
      if (startYRef.value < newHeightRef.value) {
        newHeightRef.value = vh * 30;
      }
      if (startYRef.value > newHeightRef.value) {
        newHeightRef.value = vh * 70;
      }
      isTouchRef.value = false;
      return;
    }
    if (startYRef.value < newHeightRef.value) {
      newHeightRef.value = vh * 70;
    }
    if (startYRef.value > newHeightRef.value) {
      newHeightRef.value = vh * 30;
    }
    isTouchRef.value = false;
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isTouchRef,
    newHeightRef,
  };
};
export default useResizing;
