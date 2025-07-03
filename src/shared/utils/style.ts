/**
 * Получает значение CSS переменной из указанного элемента
 * @param variableName - Название CSS переменной (с префиксом '--' или без)
 * @param element - Элемент, из которого нужно получить переменную (по умолчанию document.documentElement)
 * @returns Значение переменной или null, если переменная не найдена
 */
export function getCssVariable(
  variableName: string,
  element: HTMLElement = document.documentElement
): string | null {
  // Добавляем префикс '--', если его нет
  const fullVariableName = variableName.startsWith('--') ? variableName : `--${variableName}`

  // Получаем значение переменной
  const value = getComputedStyle(element).getPropertyValue(fullVariableName).trim()

  // Возвращаем значение или null, если оно пустое
  return value || null
}
