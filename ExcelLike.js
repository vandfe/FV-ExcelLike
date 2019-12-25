(function () {
    this.ExcelLike = function () {

        // Define option defaults
        var defaults = {
            headerList: [],
            tableId: ''
        }

        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        BuildTable.call(this);
    }

    //Private methods
    function BuildTable() {
        document.getElementById(this.options.tableId).classList.add('el-table');
        BuildHeader.call(this);
        BuildBody.call(this);
    }

    function BuildHeader() {
        thead = document.createElement('thead');
        tr = document.createElement('tr');

        local_cell_number = document.createElement('th');
        local_cell_number.style.width = '25px';
        local_cell_number.classList = 'el-header';
        tr.appendChild(local_cell_number);
        console.log(this.options);

        this.options.headerList.forEach(element => {
            th = document.createElement('th');
            th.innerHTML = element;
            th.classList = 'el-header';
            tr.appendChild(th);
        });

        thead.appendChild(tr);
        document.getElementById(this.options.tableId).appendChild(thead);
    }

    function BuildBody() {
        tbody = document.createElement('tbody');
        tr = document.createElement('tr');

        cell_num = document.createElement('td');
        cell_num.innerHTML = 1;
        cell_num.style.width = '25px';
        tr.appendChild(cell_num);

        this.options.headerList.forEach(element => {
            th = document.createElement('td');
            input = document.createElement('textarea');
            th.appendChild(input);
            tr.appendChild(th);
        });

        tbody.appendChild(tr);
        document.getElementById(this.options.tableId).appendChild(tbody);
    }

    // Utility method to extend defaults with user options
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }
}());