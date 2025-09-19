# 组件架构说明

## 组件结构

```
app/
├── page.tsx                 # 主页面 - 状态管理和布局
└── components/
    ├── Navigation.tsx        # 顶部导航栏
    ├── InputSection.tsx     # 输入区域组件
    ├── ExamplesSection.tsx   # 示例区域组件
    ├── ModelSelector.tsx    # 模型选择组件
    ├── ImageDisplay.tsx     # 图片显示组件
    └── CustomDropdown.tsx   # 自定义下拉组件
```

## 组件职责

### 1. Navigation.tsx

- **职责**: 顶部导航栏
- **功能**: 显示应用标题和设置按钮
- **Props**: 无

### 2. InputSection.tsx

- **职责**: 图片描述输入区域
- **功能**:
  - 显示输入框和生成按钮
  - 处理表单提交
  - 显示加载状态
- **Props**:
  - `prompt: string` - 当前输入内容
  - `setPrompt: (prompt: string) => void` - 设置输入内容
  - `onSubmit: (e: React.FormEvent) => void` - 提交处理函数
  - `loading: boolean` - 加载状态

### 3. ExamplesSection.tsx

- **职责**: 快速示例区域
- **功能**:
  - 显示预设的示例提示词
  - 点击示例自动填充输入框
- **Props**:
  - `onExampleClick: (prompt: string) => void` - 示例点击处理函数

### 4. ModelSelector.tsx

- **职责**: AI 模型选择
- **功能**:
  - 显示可用的 AI 模型选项
  - 处理模型切换
- **Props**:
  - `model: string` - 当前选中的模型
  - `onModelChange: (model: string) => void` - 模型变更处理函数

### 5. ImageDisplay.tsx

- **职责**: 图片显示区域
- **功能**:
  - 显示生成的图片
  - 提供下载功能
  - 显示空状态和加载状态
- **Props**:
  - `images: GeneratedImage[]` - 生成的图片数组
  - `loading: boolean` - 加载状态
  - `onDownload: (url: string, filename: string) => void` - 下载处理函数

### 6. CustomDropdown.tsx

- **职责**: 可复用的自定义下拉组件
- **功能**:
  - 提供统一的下拉选择体验
  - 支持点击外部关闭
  - 支持键盘导航
- **Props**:
  - `options: DropdownOption[]` - 选项数组
  - `value: string` - 当前选中值
  - `onChange: (value: string) => void` - 变更处理函数
  - `placeholder?: string` - 占位符文本
  - `className?: string` - 自定义样式类

## 数据流

```
page.tsx (状态管理)
├── InputSection (输入处理)
├── ExamplesSection (示例填充)
├── ModelSelector (模型选择)
└── ImageDisplay (结果展示)
```

## 优势

1. **可维护性**: 每个组件职责单一，易于理解和修改
2. **可复用性**: CustomDropdown 等组件可以在其他地方复用
3. **可测试性**: 每个组件可以独立测试
4. **可扩展性**: 新增功能时只需修改对应组件
5. **代码清晰**: 主页面代码从 300+行减少到 120 行左右
