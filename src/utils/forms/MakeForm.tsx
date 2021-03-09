import React, { RefObject } from 'react'
import { Form } from "@fluentui/react-northstar"
import { DeepMap } from 'react-hook-form/dist/types/utils'
import { FieldError } from 'react-hook-form'
import { FormStateProxy } from 'react-hook-form/dist/types/form'
import { stringAsNestedSelector } from '../text/stringAsNestedSelector'
import { camel2Sentence } from '../text/camelToSentence'




export interface ShorthandField {
    id: string,
    label?: string,
    type?: string,
    validation?: Rules,
}


export interface Rules {
    required?: string | boolean
    maxLength?: number,
    minLength?: number,
    pattern?: RegExp,
    validate?: (value: string) => boolean | string
}



// Turn an array into a validated form - the form generated will be validated with react hook forms
export const MakeForm = (fields: ShorthandField[], errors: DeepMap<Record<string, any>, FieldError>, register: (rules: Rules) => ((instance: HTMLInputElement | null) => void) | RefObject<HTMLInputElement> | null | undefined, formState: FormStateProxy<Record<string, any>>) => {
    const form = []
    for (const field of fields) {
        const humanLabel = field.label || camel2Sentence(field.id)
        // PERFORMANCE??? - this only needs to be done for dynamic forms, good place to look at performance if slow
        const error = stringAsNestedSelector<typeof errors>(errors, field.id);
        const touched = stringAsNestedSelector<typeof formState.touched>(formState.touched, field.id);
        form.push(<Form.Input
            label={humanLabel}
            id={field.id}
            key={field.id}
            name={field.id}
            type={field?.type}
            ref={register(field?.validation || {})}
            errorMessage={error && (error.message || "Please input a valid " + humanLabel)}
            showSuccessIndicator={!error && touched
            } />)
    }
    return form
}