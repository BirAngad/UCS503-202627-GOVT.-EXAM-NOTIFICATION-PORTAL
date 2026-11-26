import {useState,useEffect} from 'react';
import {api,token} from '../api';
export function useReminders(){
 const [reminders,setReminders]=useState<Set<string>>(new Set());const [alerts,setAlerts]=useState(false);
 useEffect(()=>{let active=true;const load=()=>{if(!token()){setReminders(new Set());setAlerts(false);return;}Promise.all([api('/reminders'),api('/profile')]).then(([ids,u])=>{if(active){setReminders(new Set(ids));setAlerts(u.alerts)}}).catch(()=>{if(active){setReminders(new Set());setAlerts(false)}});};load();window.addEventListener('govexam-auth',load);return()=>{active=false;window.removeEventListener('govexam-auth',load)}},[]);
 async function toggle(id:string|number){if(!token())throw new Error('Sign in from Settings to save exams.');const key=String(id);const remove=reminders.has(key);await api('/reminders/'+key,remove?'DELETE':'PUT');setReminders(prev=>{const next=new Set(prev);remove?next.delete(key):next.add(key);return next});return remove?'Reminder removed':'Reminder saved';}
 return {reminders,alerts,toggle};
}
