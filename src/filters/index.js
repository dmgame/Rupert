import Vue from 'vue';
import date from './date';
import passedTime from './passedTime';

const filters = {
  date,
  passedTime,
};

Object.entries(filters).forEach(([name, fn]) => {
  Vue.filter(name, fn);
});
