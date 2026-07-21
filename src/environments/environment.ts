export const environment = {
  production: false,
  // Empty = relative '/api/chat', only reachable if the API happens to run on the same origin
  // (e.g. `vercel dev`). Set to the deployed function's origin to test against it from `ng serve`.
  apiBaseUrl: '',
  emailjs: {
    serviceId: 'service_3jwgquj',
    templateId: 'template_co9i67p',
    publicKey: '7FclhHv1cwqcuSWGr',
  },
};
