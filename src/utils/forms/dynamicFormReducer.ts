import { Reducer } from 'react';
import { DynamicFormState } from './MakeDynamicForm';
import { ShorthandField } from './MakeForm';

export const dynamicFormReducer = (
  fields: (index: number) => ShorthandField[]
): Reducer<DynamicFormState, { type: 'INCREASE' | 'DECREASE' }> => {
  return (state: DynamicFormState, action: { type: string }): DynamicFormState => {
    switch (action.type) {
      case 'INCREASE':
        return {
          ...state,
          formFields: [...state.formFields, fields(state.formFields.length)],
        };
      case 'DECREASE':
        return {
          ...state,
          formFields: state.formFields.slice(0, state.formFields.length - 1),
        };
    }
    return state;
  };
};
