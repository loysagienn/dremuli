import { atom, computed } from "nanostores";
import { selectLanguage } from "selectors";
import { Text, Store } from "types";

async function getEn() {
  const en = await import("lang/en");

  if (!window.__I18N__) {
    window.__I18N__ = {};
  }

  window.__I18N__.en = en.en;

  return en.en;
}

async function getRu() {
  const ru = await import("lang/ru");

  if (!window.__I18N__) {
    window.__I18N__ = {};
  }

  window.__I18N__.ru = ru.ru;

  return ru.ru;
}

export function initText({ subscribe, getState }: Store) {
  const i18n = window.__I18N__;
  const $ru = atom<Text | null>(i18n?.ru ?? null);
  const $en = atom<Text | null>(i18n?.en ?? null);
  let pendingEn: Promise<Text> | null = null;
  let pendingRu: Promise<Text> | null = null;

  const $currentLang = atom(selectLanguage(getState()));

  subscribe(() => {
    const lang = selectLanguage(getState());

    if ($currentLang.get() !== lang) {
      $currentLang.set(lang);
    }
  });

  $currentLang.subscribe((lang) => {
    const ru = $ru.get();
    const en = $en.get();

    if (lang === "en" && !en && !pendingEn) {
      pendingEn = getEn();

      pendingEn.then((text) => $en.set(text));
    }
    if (lang === "ru" && !ru && !pendingRu) {
      pendingRu = getRu();

      pendingRu.then((text) => $ru.set(text));
    }
  });

  const $text = computed([$currentLang, $ru, $en], (currentLang, ru, en) => {
    if (currentLang === "en" && en) {
      return en;
    }

    if (currentLang === "ru" && ru) {
      return ru;
    }

    return en || ru;
  });

  return $text;
}
