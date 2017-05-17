
// Vendor code
import Vue from 'vue';

const blueprint = {

	props: {

		id: {
			type: Number,
			required: true
		},

		title: {
			type: String
		}

	},

	data: function () {
		return {
			isPristine: true
		};
	},

	computed: {

		isValid: function () {
			return this.id > -1;
		},

		sanitizedTitle: function () {
			return this.title ? this.title : 'Some role';
		}

	}

};

export { blueprint };
export default Vue.extend(blueprint);
