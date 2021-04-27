/**提取avue crud 基础配置 */

import { formatterFiltersFormatMoney } from '@/utils/filters.js'
/**
 * 表单必填规则
 * @param {*} title 
 * @returns 
 */
export function required(title) {
    return [{
        required: true,
        message: `请输入${title}`,
        trigger: "blur"
    }]
}
export function column_money(label, prop, isRequired, other) {
    return [{
        label: label, prop: prop,
        type: 'number',
        value: 0,
        minRows: 0,
        precision: 2,
        formatter: formatterFiltersFormatMoney,
        rules: isRequired ? required(label) : [],
        ...other,
    }]
}
export function column_textarea(label, prop, isRequired, other) {
    return [{
        label: label, prop: prop,
        type: 'textarea',
        rules: isRequired ? required(label) : [],
        ...other,
    }]
}
export function column_def(label, prop, isRequired, other) {
    return [{
        label: label, prop: prop,
        rules: isRequired ? required(label) : [],
        ...other,
    }]
}
export function column_switch(label, prop, isRequired, other) {
    return [{
        label: label, prop: prop,
        type: 'switch',
        rules: isRequired ? required(label) : [],
        ...other,
    }]
}

export function group_column_formslot(prop, other) {
    return [{
        prop: prop,
        hide: true, editDisplay: false, viewDisplay: true, addDisplay: false, formslot: true, span: 24, labelWidth: 0,
        ...other,
    }]
}

export function group_def(column) {
    return {
        group: [
            {
                prop: 'group',
                arrow: false,
                addDisplay: false,
                viewDisplay: true,
                editDisplay: false,
                column:column
            },
        ]
    }
}
