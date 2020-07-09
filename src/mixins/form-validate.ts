import { Vue, Component } from 'vue-property-decorator'

@Component
export default class FormValidate extends Vue {

  required(propertyType: any) {
    return (v: string) => (v && (!!v || v.length > 0)) || `You must input a ${propertyType}`;
  }

  // input length must greater than min length
  minLength(propertyType: any, minLength: number) {
    return (v: string) => (v && v.length >= minLength) || `${propertyType} must be greater than ${minLength} characters`;
  }

  // input length must less than max length
  maxLength(propertyType: any, maxLength: number) {
    return (v: string) => (v && v.length <= maxLength) || `${propertyType} must be less than ${maxLength} characters`;
  }

  // input must be email type
  email(propertyType: any) {
    return (v: string) => (v && /.+@.+\..+/.test(v)) || `${propertyType} email is not validate`;
  }

  // input must greater than min number
  minNumber(propertyType: any, minNumber: number) {
    return (v: number) => (v && v >= minNumber) || `${propertyType} must be greater than ${minNumber}`;
  }

  // input must less than max number
  maxNumber(propertyType: any, maxNumber: number) {
    return (v: number) => (v && v <= maxNumber) || `${propertyType} must be less than ${maxNumber}`;
  }
}
