export const TITLE_MAX_LENGTH = 120

/** Devuelve un mensaje de error o null si el título es válido. */
export function validateTitle(value: string): string | null {
  const title = value.trim()
  if (title.length === 0) return 'Escribe un título para la tarea.'
  if (title.length < 3) return 'El título debe tener al menos 3 caracteres.'
  if (title.length > TITLE_MAX_LENGTH) return `El título no puede superar ${TITLE_MAX_LENGTH} caracteres.`
  return null
}
