import request from '@/services/request';

export const normalizeFields = fields =>
  fields.reduce((acc, cur) => {
    if (!Array.isArray(cur)) {
      cur = [cur];
    }
    const [key, initialValue = []] = cur;

    acc[key] = {
      value: initialValue,
      initialValue,
      loading: false,
      error: null,
    };
    return acc;
  }, {});

export default (fields = [], { namespace = 'asyncData' } = {}) => {
  if (!Array.isArray(fields)) {
    console.error('[withAsyncData] ', 'field config should be an array');
    return;
  }

  return {
    name: 'with-async-data-local',

    data: {
      [namespace]: normalizeFields(fields),
    },

    methods: {
      async fetchAsyncData(fieldName, config) {
        if (!Object.prototype.hasOwnProperty.call(this[namespace], fieldName)) {
          console.error(`[withAsyncData] '${fieldName}' not defined in asyncData`);
          return;
        }

        const field = this[namespace][fieldName];

        field.loading = true;
        try {
          const data = await request(config);
          field.value = data;

          return data;
        } catch (error) {
          field.error = error;
          field.value = field.initialData;

          // TODO: deal with error
          console.error(error);

          throw error;
        } finally {
          field.loading = false;
        }
      },

      resetAsyncData() {
        this[namespace] = normalizeFields(fields);
      },
    },
  };
};
