<script setup>
  import useMap from '../../../shared/hooks/useMap.js';
  import useWatchPosition from '../../../shared/hooks/useWatchPosition';

  const { mapRef, watchSuccessCallback } = useMap();

  const { posRef, distanceRef } = useWatchPosition({
    callback: watchSuccessCallback,
  });
</script>

<template>
  <div class="pos">
    <p>{{ posRef.latitude }}</p>
    <p>{{ posRef.longitude }}</p>
    <p>남은 거리 : {{ distanceRef }}M</p>
  </div>
  <div
    :ref="mapRef"
    id="map"
    :style="{
      width: '100vw',
      height: 'calc(60 * var(--vh))',
    }"
    style="z-index: 0"
  ></div>
</template>

<style scoped>
  .pos {
    position: fixed;
    z-index: 999;
    left: 30px;
    top: 200px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
