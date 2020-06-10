import { Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { AppState } from './store';

export class BaseComponent extends Vue {
	public $store!: Store<AppState>;
}

export { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
