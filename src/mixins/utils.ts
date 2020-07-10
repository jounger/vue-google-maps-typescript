import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Utils extends Vue {
  isEmptyObject(obj: object) {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) return true;
    return false;
  }
}
