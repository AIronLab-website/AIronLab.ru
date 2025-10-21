/**
 * Blog Utility Functions
 * 
 * Helper функции для работы с блогом
 */

/**
 * Генерирует slug из заголовка
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // Транслитерация русских букв
    .replace(/а/g, 'a')
    .replace(/б/g, 'b')
    .replace(/в/g, 'v')
    .replace(/г/g, 'g')
    .replace(/д/g, 'd')
    .replace(/е/g, 'e')
    .replace(/ё/g, 'yo')
    .replace(/ж/g, 'zh')
    .replace(/з/g, 'z')
    .replace(/и/g, 'i')
    .replace(/й/g, 'y')
    .replace(/к/g, 'k')
    .replace(/л/g, 'l')
    .replace(/м/g, 'm')
    .replace(/н/g, 'n')
    .replace(/о/g, 'o')
    .replace(/п/g, 'p')
    .replace(/р/g, 'r')
    .replace(/с/g, 's')
    .replace(/т/g, 't')
    .replace(/у/g, 'u')
    .replace(/ф/g, 'f')
    .replace(/х/g, 'h')
    .replace(/ц/g, 'c')
    .replace(/ч/g, 'ch')
    .replace(/ш/g, 'sh')
    .replace(/щ/g, 'sch')
    .replace(/ъ/g, '')
    .replace(/ы/g, 'y')
    .replace(/ь/g, '')
    .replace(/э/g, 'e')
    .replace(/ю/g, 'yu')
    .replace(/я/g, 'ya')
    // Заменяем пробелы и специальные символы на дефисы
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Подсчитывает примерное время чтения
 * @param content - Содержимое поста (HTML или текст)
 * @returns Время чтения в минутах
 */
export function calculateReadTime(content: string): number {
  // Удаляем HTML теги
  const text = content.replace(/<[^>]*>/g, '')
  
  // Подсчитываем слова
  const words = text.trim().split(/\s+/).length
  
  // Средняя скорость чтения: 200 слов в минуту
  const wordsPerMinute = 200
  const minutes = Math.ceil(words / wordsPerMinute)
  
  return Math.max(1, minutes) // Минимум 1 минута
}

/**
 * Генерирует excerpt из content если не указан
 */
export function generateExcerpt(content: string, maxLength = 200): string {
  const text = content.replace(/<[^>]*>/g, '').trim()
  if (text.length <= maxLength) return text
  
  return text.substring(0, maxLength).trim() + '...'
}

