<script setup>
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Guide from '../../entities/onboarding/components/Guide.vue';
  import useKeyword from '../../shared/hooks/useKeyword';
  import KeywordSelector from '../../shared/components/KeywordSelector.vue';
  import Button from '../../shared/components/Button.vue';
  import LeftArrow from '../../shared/icons/LeftArrow.vue';
  import useCharacterStore from '@/app/store/useCharacterStore';
  import Loading from '@/entities/landing/components/Loading.vue';

  const timerRef = ref(null);
  const isLoading = ref(false);

  const router = useRouter();
  const ONBOARDING_SECOND_SECTION = ['관심있는 분야를', '3가지 선택해주세요.'];
  const {
    addSelectedKeywordList,
    keywordGroupRef,
    getIsSelected,
    selectedKeywordList,
  } = useKeyword({
    size: 4,
  });
  useCharacterStore();
  const isButtonActive = computed(() => selectedKeywordList.value.length === 3);
  //기획에 따라 수정 필요

  // const handleSubmitClick = () => {
  //   if (selectedKeywordList.value.length === 3) {
  //     localStorage.setItem(
  //       'selectedKeywordList',
  //       JSON.stringify(selectedKeywordList.value),
  //     );
  //     isLoading.value = true;
  //     timerRef.value = setTimeout(() => {
  //       router.push('/content-chat');
  //     }, 3000);
  //   }
  // };
  const handleSubmitClick = () => {
    if (selectedKeywordList.value.length === 3) {
      localStorage.setItem(
        'selectedKeywordList',
        JSON.stringify(selectedKeywordList.value),
      );
      router.push('/content-chat');
    }
  };

  const handleKeywordClick = (id) => {
    addSelectedKeywordList(id);
  };

  const handleBack = () => {
    router.back();
  };
</script>

<template>
  <main class="onboarding-page">
    <header class="keyword-header">
      <Button
        class="back-button icon-lg"
        @click="handleBack"
        :icon="LeftArrow"
        iconSize="icon-md"
      />
    </header>
    <Guide
      class="keyword-guide title-16px"
      :guide="ONBOARDING_SECOND_SECTION"
    />
    <KeywordSelector
      class="onboarding-keyword"
      :keywordGroupRef="keywordGroupRef"
      :handleKeywordClick="handleKeywordClick"
      :getIsSelected="getIsSelected"
    />
    <Button
      :class="{ 'black md': isButtonActive, 'gray-10 md': !isButtonActive }"
      :disabled="!isButtonActive"
      @click="handleSubmitClick"
      class="onboarding-button"
      label="선택 완료"
    />
  </main>
</template>

<style scoped>
  .keyword-header {
    width: 100%;
    height: 40px;
    padding: 6px;
  }
  .onboarding-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100 * var(--vh));
    /* gap: calc(5 * var(--vh)); */
    overflow-x: hidden;
    touch-action: none;
  }

  .onboarding-button {
    position: fixed;
    bottom: calc(5 * var(--vh));
  }

  .logo {
    width: 40px;
    height: 40px;
  }

  .keyword-section {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    padding-top: 30px;
  }

  .keyword-article-odd {
    display: flex;
    gap: 6px;
    overflow-x: scroll;
    padding: 2px 40px 2px 5px;
    width: 100%;
  }

  .keyword-article-even {
    display: flex;
    gap: 6px;
    overflow-x: scroll;
    padding: 2px 5px 2px 40px;
    width: 100%;
  }

  .keyword-article-odd::-webkit-scrollbar,
  .keyword-article-even::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera */
  }
</style>
