
export default {
    components: {
    },
    data() {
        return {
        };
    },
    methods: {
        hasPermission(key) {
            let arr = this.$store.state.user.roles.filter((v) => { return v.url == key });
            if (arr && arr.length > 0) {
                return 1
            } else {
                return 0
            }
        },
        configPermission() {
            let falg = 0;
            if (this.config.detail) {
                this.permission.viewBtn = this.$store.state.user.roles.filter((v) => { return v.url == this.config.detail }).join(',') ? true : false;
                this.permission.viewBtn ? falg++ : '';
            }
            if (this.config.save) {
                this.permission.addBtn = this.$store.state.user.roles.filter((v) => { return v.url == this.config.save }).join(',') ? true : false;
                this.permission.addBtn ? falg++ : '';
            }
            if (this.config.delete) {
                this.permission.delBtn = this.$store.state.user.roles.filter((v) => { return v.url == this.config.delete }).join(',') ? true : false;
                this.permission.delBtn ? falg++ : '';
            }
            if (this.config.update) {
                this.permission.editBtn = this.$store.state.user.roles.filter((v) => { return v.url == this.config.update }).join(',') ? true : false;
                this.permission.editBtn ? falg++ : '';
            }
            if (!falg) {
                this.permission.menu = false
            }
            if (this.config.list) {
                let show = this.$store.state.user.roles.filter((v) => { return v.url == this.config.list }).join(',') ? true : false;
                this.option.searchShow = show;
                this.option.searchShowBtn = show;
                this.option.refreshBtn = show;
            }
        }
    },
    created() {
        this.configPermission();
    },
    mounted() {
    },
}
