<template>
  <div class="date-picker-wrap">
    <DatePicker
      v-model="date"
      v-on="$listeners"
      v-bind="$attrs"
      class="base-date-picker"
    />
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  name: 'BaseDatePicker',
  components: {
    DatePicker,
  },
  data: () => ({
    date: '',
  }),
};
</script>

<style lang="scss" scoped>
.base-date-picker {
  max-width: 120px;
  &/deep/ .mx-input {
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid #E5E6FF;
    font-family: 'Nunito', sans-serif;
    font-weight: normal;
    font-size: 11px;
    line-height: 17px;
    color: #828282;
    border-radius: 0;
    max-width: 120px;
  }
}
</style>
