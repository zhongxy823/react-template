import {useState} from 'react';
import styles from './index.less';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/webpack-resolver';
import {jsonParse, jsonStringify} from '@/utils/index'

export default () => {
  const schemaJson = {
    type: 'object', // 说明子节点的类型
    properties: {
      inputDemo: { // 传递的字段名，可修改
        type: 'string', // 数据类型
        maxLength: 12, // 最大长度
        minLength: 6, // 最小长度
        title: '普通 Input', // label名称
        'x-component': 'input', // 渲染的组件名称
        'x-component-props': { // 渲染的组件的参数
          placeholder: '如：请输入',
        },
        description: '这是描述文字', // 渲染的组件下方的描述文字
        'x-rules': [{ required: true, message: '请输入' }], // 校验内容
      },
      textAreaDemo: {
        type: 'string',
        title: 'TextArea',
        'x-component': 'textArea',
        'x-component-props': {
          placeholder: '多文本输入框', // 输入框内的 提示
          rows: 2,
        },
      },
      numberPickerDemo: {
        type: 'string',
        title: 'NumberPicker',
        'x-component': 'numberPicker',
      },
      inputNumDemo: {
        type: 'number',
        title: "{{ text('数字 Input', help('这里可以填一些描述')) }}", // text() & help()
        'x-component': 'input',
        'x-component-props': {
          suffix: '秒', // 输入框末尾的插槽
        },
        maximum: 100, // 数字的最大值
        minimum: 1, // 数字的最小值
        'x-rules': [
          { required: true, message: '请输入时间窗' },
          { pattern: /^\d*$/, message: '仅限数字' },
        ],
      },
      selectDemo: {
        type: 'string',
        title: '选择框 Select',
        'x-component': 'select',
        enum: [ // 可选项项，select、radio 等都会用到
          { label: '选项 1', value: 'select1' },
          { label: '选项 2', value: 'select2' },
        ],
      },
      switchDemo: {
        type: 'boolean',
        title: '普通 Switch',
        'x-component': 'switch',
      },
      switchCustomDemo: {
        type: 'number',
        title: '自定义值 Switch',
        'x-component': 'switch',
        'x-component-props': {
          'active-value': '1', // 自定义 switch 选中 value
          'inactive-value': '2',// 自定义 switch 未选中 value
        },
        'x-linkages': [ // 简单的交互
          {
            type: 'value:visible',
            target: '*(radioDemo)',
            condition: '{{$value == 1}}',
          },
        ],
      },
      radioDemo: {
        type: 'number',
        title: "{{ text('Radio', help(text('1111', br(), '2222'))) }}", // text(), br(), help()
        'x-component': 'Radio',
        enum: [
          { label: '选项 1', value: 1 },
          { label: '选项 2', value: 2 },
          { label: '选项 3', value: 3 },
        ],
      },
      checkboxDemo: {
        type: 'string',
        title: 'Checkbox',
        'x-component': 'checkbox',
        enum: [
          { label: '选项 1', value: 'checkbox1' },
          { label: '选项 2', value: 'checkbox2' },
          { label: '选项 3', value: 'checkbox3' },
        ],
      },
      datePicker: {
        type: 'date',
        title: 'DatePicker',
        'x-component': 'datePicker',
        'x-props': {
          addonAfter: "{{ help('这是帮助信息', 10) }}",
        },
      },
      yearPicker: {
        type: 'date',
        title: 'YearPicker',
        'x-component': 'yearPicker',
      },
      monthPicker: {
        type: 'date',
        title: 'MonthPicker',
        'x-component': 'monthPicker',
      },
      weekPicker: {
        type: 'date',
        title: 'WeekPicker',
        'x-component': 'weekPicker',
      },
      timePicker: {
        type: 'date',
        title: 'TimePicker',
        'x-component': 'timePicker',
      },
      '[startDate,endDate]': {
        title: 'DateRangePicker',
        type: 'daterange',
        'x-component': 'daterangepicker',
      },
      '[startTime,endTime]': {
        title: 'TimeRangePicker',
        type: 'daterange',
        'x-component': 'timeRangePicker',
      },
      range: {
        type: 'number',
        title: 'Range',
        'x-component': 'range',
        'x-component-props': {
          min: 12,
          max: 66
        }
      },
      rating: {
        type: 'number',
        title: 'Rating',
        'x-component': 'rating',
      },
    },
  };
  const [editorValue, setEditorValue] = useState<string>(jsonStringify(schemaJson));
  const onChange = (e: string) => {
    setEditorValue(e);
  };
  const completers = [
    {
      name: 'name',
      value: `"inputDemo1": {
        "type": "string",
        "maxLength": 12,
        "minLength": 6,
        "title": "普通 Input",
        "x-component": "input",
        "x-component-props": {
          "placeholder": "如：请输入"
        },
        "description": "这是描述文字",
        "x-rules": [{ "required": true, "message": "请输入" }]
      },`,
      score: 100,
      meta: '输入框模板',
    },
  ];
  const complete = (editor: any) => {
    editor.completers = [
      // 自己的代码提示
      {
        getCompletions(
          editor: any,
          session: any,
          pos: any,
          prefix: any,
          callback: any,
        ) {
          callback(null, completers);
        },
      },
      // 编辑器的代码提示
      // ...editor.completers,
    ];
  };
  return (
    <div>
      <h1 className={styles.title}>index</h1>
      <AceEditor
          className={styles.editor}
          value={editorValue}
          mode="javascript"
          theme="github"
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{
            $blockScrolling: true,
          }}
          setOptions={{
            useWorker: false,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: false,
            tabSize: 2,
          }}
          onLoad={complete}
          onBlur={() => {setEditorValue(jsonStringify(jsonParse(editorValue)));console.log(1111)}}
        />
    </div>
  );
};
