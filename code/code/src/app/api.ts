export const token = () => localStorage.getItem('govexam-token');
export async function api(path: string, method = 'GET', body?: unknown) {
  const t = token();
  const response = await fetch('/api'+path, {method, headers: {...(t ? {Authorization:`Bearer ${t}`} : {}), ...(body !== undefined ? {'Content-Type':'application/json'} : {})}, ...(body !== undefined ? {body:JSON.stringify(body)} : {})});
  const result = await response.json().catch(()=>({message:'Backend unavailable. Start the backend on port 5000.'}));
  if (!response.ok || !result.success) throw new Error(result.message || 'Request failed');
  return result.data;
}
