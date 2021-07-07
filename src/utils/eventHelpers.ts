export function focusElement(e: any) {
  e.currentTarget.getInputElement().then((el: HTMLInputElement) => el.select());
}

export async function toggleActionsSlide(selector: string) {
  const productEl: any = document.querySelector("#" + selector);
  const openItemNum = await productEl.getOpenAmount();
  if (productEl && openItemNum === 0) {
    productEl.open();
  } else {
    productEl.close();
  }
}

export function selectFile() {
  const fileInput: HTMLInputElement | null =
    document.querySelector("#data-import");
  if (fileInput) {
    fileInput.click();
  }
}

export function resetFile() {
  const fileInput: HTMLInputElement | null =
    document.querySelector("#data-import");
  if (fileInput) {
    fileInput.value = "";
  }
}

export function changeBorderStyle(e: any, element: any) {
  if (element) {
    if (e?.detail?.scrollTop === 0 || e?.scrollOffset === 0) {
      element.style.borderTop = "1px solid transparent";
    } else {
      element.style.borderTop = "1px solid rgba(0,0,0,0.1)";
    }
  }
}
