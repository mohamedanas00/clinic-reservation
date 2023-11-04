
export class ApiFeatures {
    constructor(sequalizeQuery, queryString) {
        this.sequalizeQuery = sequalizeQuery;
        this.queryString = queryString
    }
    pagination(model) {
    // 1-pagination
    let pageNumber = this.queryString.page * 1 || 1;
    if (pageNumber <= 0) pageNumber = 1;
    let limit = process.env.page_limit;
    let offset = (pageNumber - 1) * limit;

    this.page = pageNumber;
    
    model.count().then((value) => {
        this.totalPages = Math.ceil(value / limit);
        this.countDocuments = value;
        if (this.totalPages > this.page) {
            this.next = this.page + 1;
        }
        if (this.page > 1) {
            this.previous = this.page - 1;
        }
    });

    // this.sequalizeQuery = {
    //     offset: offset,
    //     limit: limit
    // };
    
    return this;
}


    filter() {
        //2-filter
        //... solve obj = obj
        let filterObj = { ...this.queryString }
        let excludedQuery = ['page', 'sort', 'fields', 'keyword']
        excludedQuery.forEach(element => {
            delete filterObj[element]
        })
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        filterObj = JSON.parse(filterObj)
        this.sequalizeQuery.find(filterObj)
        return this
    }

    sort() {
        //3-sort
        if (this.queryString.sort) {
            let sortBy = this.queryString.sort.split(',').join(' ')
            this.sequalizeQuery.sort(sortBy)
        }
        return this
    }

    search() {

        //search
        if (this.queryString.keyword) {
            this.sequalizeQuery.find({
                $or: [
                    { name: { $regex: this.queryString.keyword, $options: 'i' } },
                    { description: { $regex: this.queryString.keyword, $options: 'i' } }
                ]
            })

        }
        return this
    }

    fields() {
        //selected fields
        if (this.queryString.fields) {
            let fields = this.queryString.fields.split(',').join(' ')

            this.sequalizeQuery.select(fields)
        }
        return this
    }
}