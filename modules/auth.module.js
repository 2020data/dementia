/**
 * 身份驗證狀態管理（支援 Supabase Auth 登入／登出）
 */
import { getSupabase } from "./supabase.module.js";

const listeners = new Set();
let currentUser = null;

export async function initAuth() {
  const sb = getSupabase();
  if (!sb) {
    currentUser = null;
    notify();
    return null;
  }
  const { data } = await sb.auth.getSession();
  currentUser = data?.session?.user || null;
  notify();

  sb.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user || null;
    notify();
  });
  return currentUser;
}

export function getCurrentUser() {
  return currentUser;
}

export function onAuthChange(cb) {
  listeners.add(cb);
  cb(currentUser);
  return () => listeners.delete(cb);
}

function notify() {
  listeners.forEach((cb) => cb(currentUser));
}

export async function signInWithPassword(email, password) {
  const sb = getSupabase();
  if (!sb) throw new Error("尚未設定 Supabase 連線，請先於 config/app.config.js 填入金鑰。");
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  currentUser = data.user;
  notify();
  return data.user;
}

export async function signOut() {
  const sb = getSupabase();
  if (!sb) return;
  await sb.auth.signOut();
  currentUser = null;
  notify();
}
