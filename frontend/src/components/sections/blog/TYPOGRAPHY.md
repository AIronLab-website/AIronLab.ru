# Enhanced Blog Typography - AIronLab

Руководство по использованию типографики и компонентов оформления для блога AIronLab.

## Основные стили

### Заголовки

#### H2 - Основные разделы
```html
<h2>Заголовок раздела</h2>
```
- **Стиль**: text-3xl (md:text-4xl), font-bold, с акцентной полосой слева
- **Margin**: mt-12, mb-6
- **Особенности**: border-l-4 border-accent, scroll-mt-24 для правильной прокрутки

#### H3 - Подразделы
```html
<h3>Подзаголовок</h3>
```
- **Стиль**: text-2xl (md:text-3xl), font-bold
- **Margin**: mt-8, mb-4
- **Особенности**: scroll-mt-24 для навигации

### Параграфы
```html
<p>Текст статьи с улучшенной читаемостью.</p>
```
- **Стиль**: text-lg, leading-relaxed, text-gray-700
- **Margin**: mb-6

### Списки

#### Ненумерованные списки
```html
<ul>
  <li>Пункт списка 1</li>
  <li>Пункт списка 2</li>
  <li>Пункт списка 3</li>
</ul>
```
- **Маркеры**: accent цвет, жирные
- **Spacing**: space-y-3 между элементами
- **Padding**: pl-2 для текста

#### Нумерованные списки
```html
<ol>
  <li>Первый шаг</li>
  <li>Второй шаг</li>
  <li>Третий шаг</li>
</ol>
```
- **Маркеры**: accent цвет, жирные цифры
- **Стиль**: list-decimal
- **Spacing**: space-y-3

### Цитаты
```html
<blockquote>
  Важная мысль или цитата из статьи
</blockquote>
```
- **Стиль**: border-l-4 border-accent, bg-accent/5
- **Padding**: pl-6, py-4
- **Особенности**: italic, rounded-r-lg

### Код

#### Inline код
```html
<code>npm install</code>
```
- **Стиль**: bg-gray-100, text-accent, px-2 py-1
- **Шрифт**: mono, text-base

#### Code blocks
```html
<pre><code>
const example = "code block";
console.log(example);
</code></pre>
```
- **Стиль**: bg-gray-900, text-gray-100, p-6
- **Особенности**: rounded-xl, shadow-lg, overflow-x-auto

### Ссылки
```html
<a href="/page">Текст ссылки</a>
```
- **Стиль**: text-accent, underline, decoration-accent/30
- **Hover**: decoration-accent
- **Особенности**: transition-colors, underline-offset-4

### Изображения
```html
<img src="/image.jpg" alt="Описание" />
```
- **Стиль**: rounded-2xl, shadow-lg, my-8
- **Особенности**: max-w-full, h-auto, mx-auto

#### С подписью
```html
<figure>
  <img src="/image.jpg" alt="Описание" />
  <figcaption>Подпись к изображению</figcaption>
</figure>
```
- **Caption**: text-sm, text-gray-500, italic, text-center

### Горизонтальные линии
```html
<hr />
```
- **Стиль**: border-gray-200
- **Margin**: my-12

### Таблицы
```html
<table>
  <thead>
    <tr>
      <th>Заголовок 1</th>
      <th>Заголовок 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Данные 1</td>
      <td>Данные 2</td>
    </tr>
  </tbody>
</table>
```
- **Заголовки**: bg-accent/10, text-accent, font-bold
- **Ячейки**: border border-gray-200
- **Hover**: bg-gray-100/50 на строках

---

## Callout Компоненты

Специальные блоки для выделения важной информации.

### Info Callout (Информация)
```tsx
import { InfoCallout } from '@/components/sections/blog';

<InfoCallout title="Полезная информация">
  Дополнительная информация для читателя
</InfoCallout>
```
- **Цвет**: синий (blue)
- **Иконка**: Info
- **Использование**: дополнительная информация, советы

### Warning Callout (Предупреждение)
```tsx
import { WarningCallout } from '@/components/sections/blog';

<WarningCallout title="Внимание">
  Важная информация, требующая осторожности
</WarningCallout>
```
- **Цвет**: желтый (yellow)
- **Иконка**: AlertTriangle
- **Использование**: предупреждения, важные замечания

### Success Callout (Успех)
```tsx
import { SuccessCallout } from '@/components/sections/blog';

<SuccessCallout title="Готово">
  Положительный результат или подтверждение
</SuccessCallout>
```
- **Цвет**: зеленый (green)
- **Иконка**: CheckCircle
- **Использование**: успешные результаты, достижения

### Tip Callout (Совет)
```tsx
import { TipCallout } from '@/components/sections/blog';

<TipCallout title="Профессиональный совет">
  Полезный совет от экспертов
</TipCallout>
```
- **Цвет**: фиолетовый (purple)
- **Иконка**: Lightbulb
- **Использование**: советы, рекомендации, best practices

### Danger Callout (Опасность)
```tsx
import { DangerCallout } from '@/components/sections/blog';

<DangerCallout title="Критически важно">
  Информация о серьезных рисках или ошибках
</DangerCallout>
```
- **Цвет**: красный (red)
- **Иконка**: AlertCircle
- **Использование**: критичные предупреждения, ошибки

### Универсальный Callout
```tsx
import { Callout } from '@/components/sections/blog';

<Callout type="info" title="Пользовательский заголовок">
  Содержимое callout блока
</Callout>
```
- **Типы**: 'info' | 'warning' | 'success' | 'tip' | 'danger'
- **Props**: type (обязательный), title (опциональный), className (опциональный)

---

## Примеры использования

### Статья с различными элементами

```tsx
import { InfoCallout, WarningCallout, SuccessCallout } from '@/components/sections/blog';

export default function BlogPost() {
  return (
    <article className="prose prose-lg max-w-none">
      <h2>Введение в Machine Learning</h2>

      <p>
        Machine Learning - это подраздел искусственного интеллекта,
        который позволяет компьютерам обучаться без явного программирования.
      </p>

      <InfoCallout title="Что такое ML?">
        Machine Learning использует алгоритмы для анализа данных,
        обучения на них и принятия решений на основе полученных знаний.
      </InfoCallout>

      <h3>Основные типы ML</h3>

      <ul>
        <li>Supervised Learning (Обучение с учителем)</li>
        <li>Unsupervised Learning (Обучение без учителя)</li>
        <li>Reinforcement Learning (Обучение с подкреплением)</li>
      </ul>

      <WarningCallout title="Важно знать">
        Качество модели ML напрямую зависит от качества и количества данных для обучения.
      </WarningCallout>

      <h3>Пример кода</h3>

      <pre><code>
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
      </code></pre>

      <SuccessCallout title="Результат">
        Модель успешно обучена с точностью 95%!
      </SuccessCallout>

      <blockquote>
        "Machine Learning - это новая электричество" - Andrew Ng
      </blockquote>

      <h2>Заключение</h2>

      <p>
        ML открывает огромные возможности для бизнеса и исследований.
        Начните изучение с основ и постепенно переходите к более сложным темам.
      </p>
    </article>
  );
}
```

---

## CSS классы

Все стили применяются через класс `.prose` к контейнеру article:

```tsx
<article className="prose prose-lg max-w-none" id="article-content">
  {/* Контент статьи */}
</article>
```

### Дополнительные модификаторы

- `prose-lg` - увеличенный размер шрифта (рекомендуется)
- `max-w-none` - убирает ограничение ширины
- `not-prose` - отключает prose стили для вложенных элементов

---

## Responsive дизайн

Все элементы адаптивны и хорошо отображаются на всех устройствах:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

Заголовки автоматически уменьшаются на мобильных устройствах через responsive классы (md:, lg:).

---

## Accessibility

Все компоненты соответствуют стандартам доступности:

- Семантические HTML теги
- Правильная иерархия заголовков
- Достаточный контраст цветов (WCAG AA)
- Читаемые размеры шрифтов
- Поддержка клавиатурной навигации

---

## Производительность

- Lazy loading для изображений
- Оптимизированные стили через Tailwind CSS
- Минимальный JavaScript для статического контента

---

## Дополнительная информация

Для получения дополнительной информации обратитесь к:
- [Документация Tailwind Typography](https://tailwindcss.com/docs/typography-plugin)
- [AIronLab Design System](../../../lib/design-system.md)
- [Blog Component Architecture](./README.md)
