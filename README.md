# Requirements

### Exam Structure

- [X] Each exam consists of a **maximum of 180 questions** with a **time limit of 230 minutes**.
- [X] A **minimum of 5 full exams** is required.
- [X] Each course includes **practice exercises** covering key PMP domains, for example:
  - Agile
  - Hybrid
  - Schedule & Cost
  - People
  - Domain
  - Business environment

### Question Functionality

- [X] **Question numbering (numeration)** should be clear.
- [X] Users should be able to track:
  - [X] **The number or percentage of remaining questions.**
  - [X] **The number of solved questions.**

### Exam Review & Analysis

- [X] Upon completing a test, the result should be displayed as a **percentage**. **No candidate should schedule their PMP exam unless they score at least 85%.**
- [X] **"Kill Mistakes" Feature:** All incorrect answers should be collected in a dedicated section for final review.

### Detailed Review After Exam

- [X] When reviewing completed exams, users should see:
  - [X] **All answer choices provided.**
  - [X] **Their selected answer.**
  - [X] **The correct answer.**
  - [X] **Explanations for each question.**

### Question & Answer Order:

- [X] The **order of questions in the simulator is different** from the order in the file.
- [ ] Users should have the **option to view correct answers while solving questions.** ????????????????????

### Exam Timing & Configuration

- [X] **Countdown Timer:** The exam timer should track time **by minutes** and count **down** to zero.
- [X] **System Stability:** Resolve any **configuration errors** affecting the exam experience.

### Exam Submission & Pause Functionality

- [X] **Pause Feature:** Users should be able to **pause** the exam at any time.
- [X] **Early Submission:** Users should have the option to **submit the exam** even if they haven't completed all questions.

### User Interaction & Navigation

- [X] **Drag-and-Drop:** Enable **drag-and-drop functionality** where applicable.

### Mini Exam Option

- [ ] **Shorter Exam Mode:** Provide a **mini exam feature** that allows users to take a **shorter version** of the exam (e.g., 30-50 questions).

### Post-Submission Review & Feedback

- [ ] **Limited Review Option:** If a user submits an exam, they should have the option to **review the answers** but **no automatic explanation** for why an answer is correct. ????????????????????

### Exam Result Display

- [X] Percentage Format: Ensure results are displayed in **percentage format (%)**.

### Language Support

- [X] **Multi-Language Support:** Ensure the simulator provides an **option to change the language** based on user preference.

# To Do

## المكونات الأساسية

- [ ] تجريد المكونات متعددة الاستخدامات
- [ ] تفريع المكونات الرئيسية لحالات الاختبار الثلاثة
  - [ ] قبيل بداية الاختبار
  - [ ] أثناء الاختبار
  - [ ] عرض نتائج الاختبار

## آخر

- [ ] تبسيط البيانات المرسلة للمكونات
- [ ] تغيير اتجاه العنوان الرئيسي حسب اللغة
- [ ] وراثة اتجاه الكتابة من المكونات الأب

# تحسين الأداء

(مقترحات من Claude.ai النسخة المجانية)

Looking at your React exam application code, I've identified several key performance issues and can suggest structural improvements:

## Critical Performance Issues

### 1. **Excessive Re-renders from Context Updates**
Your `SessionContext` is being updated frequently (timer updates, navigation, answers), causing all consuming components to re-render unnecessarily. This is particularly problematic for:
- Timer updates every second
- Answer selections
- Navigation between questions

### 2. **Inefficient State Management Pattern**
The current reducer pattern with a single large session object means any small change (like timer tick) triggers updates to all session-dependent components.

### 3. **Missing Memoization**
Components and expensive operations lack memoization, causing repeated calculations and renders.

## High-Level Structural Changes

### 1. **Split Context for Better Granularity**
```typescript
// Instead of one large SessionContext, create focused contexts:
const TimerContext = createContext<TimerState>()
const ExamProgressContext = createContext<ExamProgressState>()
const AnswersContext = createContext<AnswersState>()
```

### 2. **Implement State Colocation**
Move timer logic to a dedicated hook/component that doesn't affect the main exam flow:
```typescript
// Isolate timer updates from exam state
const useTimer = () => {
  // Timer logic here, separate from main session
}
```

### 3. **Optimize Data Flow Architecture**
```
Current: App → Navigation → Content → Exam/Review
                ↓
         Single SessionContext (causes cascading re-renders)

Proposed: App → Multiple Focused Contexts
               ↓
         Components subscribe only to needed state slices
```

## Specific Performance Optimizations

### 1. **Memoize Heavy Components**
```typescript
const Content = React.memo(({ session }) => {
  return examFinished(session) ? <Review /> : <Exam />
})

const Navigation = React.memo(NavigationComponent)
```

### 2. **Separate Timer State**
```typescript
// Move timer to isolated context/hook
const TimerProvider = ({ children }) => {
  const [time, setTime] = useState(initialTime)
  // Timer logic isolated here
}
```

### 3. **Lazy Load Exam Data**
```typescript
// Instead of loading random exam on mount
const [exam, setExam] = useState(null)
const loadExam = useCallback(async (examId) => {
  const examData = await import(`./assets/exams/${lang.code}/${examId}.json`)
  setExam(formatExam(examData.default))
}, [lang.code])
```

### 4. **Optimize Confirm Dialog Rendering**
The current approach re-creates confirm dialogs on every render:
```typescript
// Pre-compute and memoize confirm configurations
const confirmConfigs = useMemo(() => 
  createConfirmConfigs(session, translate), [session.examState, session.timerState])
```

## Data Flow Improvements

### 1. **Event-Driven Updates**
Instead of passing dispatch functions through props, use event emitters or custom hooks for actions:
```typescript
const useExamActions = () => ({
  startExam: () => dispatch(startExamAction()),
  pauseExam: () => dispatch(pauseExamAction()),
  // etc.
})
```

### 2. **Selective Re-rendering**
```typescript
// Components only re-render when their specific data changes
const ExamQuestion = () => {
  const currentQuestion = useSelector(state => state.questions[state.currentIndex])
  const userAnswer = useSelector(state => state.answers[state.currentIndex])
  // Only re-renders when question or answer changes
}
```

### 3. **Virtualization for Large Question Sets**
If you have many questions, implement virtual scrolling in the drawer/navigation.

## Implementation Priority

1. **High Impact, Low Effort**: Add `React.memo` to major components
2. **Medium Impact, Medium Effort**: Split contexts by responsibility
3. **High Impact, High Effort**: Refactor to event-driven architecture