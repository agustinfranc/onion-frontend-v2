export default defineEventHandler((event) => {
  const host = getHeader(event, "host"); // e.g., onion.ar
  const runtimeConfig = useRuntimeConfig(event);

  // Adjust the API URL dynamically
  const dynamicApiUrl =
    host && runtimeConfig.public.useDynamicApiUrl
      ? `https://api.${host}/api`
      : runtimeConfig.public.apiUrl;

  event.context.apiUrl = dynamicApiUrl;
});
