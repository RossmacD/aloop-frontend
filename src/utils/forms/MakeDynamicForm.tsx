import { Button, Flex } from '@fluentui/react-northstar';
import React, { RefObject, useCallback, useReducer } from 'react';
import { FieldError } from 'react-hook-form';
import { FormStateProxy } from 'react-hook-form/dist/types/form';
import { DeepMap } from 'react-hook-form/dist/types/utils';
import { camel2Sentence } from '../text/camelToSentence';
import { dynamicFormReducer } from './dynamicFormReducer';
import { MakeForm, Rules, ShorthandField } from './MakeForm';

export interface DynamicFormState {
  formFields: ShorthandField[][]
}

export type DynamicFormTemplate = (index: number) => ShorthandField[];

export const MakeDynamicForm = (
  fields: DynamicFormTemplate,
  min: number,
  max: number,
  errors: DeepMap<Record<string, any>, FieldError>,
  register: (
    rules: Rules
  ) =>
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
    | null
    | undefined,
  formState: FormStateProxy<Record<string, any>>
) => {

  const memoDynFormReducer = useCallback(
    dynamicFormReducer(fields),
    [fields],
  )
  const [formGroup, formDispatch] = useReducer(memoDynFormReducer, {
    formFields: [fields(0)]
  });

  const dForm = [];
  for (const form of formGroup.formFields) {
    dForm.push([<h3>Licence {dForm.length + 1}</h3>, ...MakeForm(form, errors, register, formState)])
  }

  return [
    ...dForm,
    <Flex gap="gap.small">

      <Button content="Remove" onClick={() => formDispatch({ type: 'DECREASE' })} disabled={formGroup.formFields.length === min} type="button" fluid />
      <Button content="Add" onClick={() => { formDispatch({ type: 'INCREASE' }); console.log(formGroup.formFields.length) }} type="button" disabled={formGroup.formFields.length === max} fluid primary />

    </Flex>,
  ];
};
