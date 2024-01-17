export class BaseRepositoryMethod {
  constructor() { }
  getPropertiesAndValuesToQuery(params: any) {
    const conditions: string[] = []
    const values: any[] = []
    Object.values(params).forEach((value: any) => values.push(value))
    Object.keys(params).forEach((key: any, index: number) => {
      if (!["created_at", "updated_at"].includes(key)) {
        conditions.push(`"${key}"=$${index + 1}`)
      }
    })
    return [conditions, values]
  }
  getPropertiesArrayAndValuesArrayToQuery(params: any): string {
    if (!params) return ''
    delete params.take
    delete params.page
    let query: string = ''
    Object.keys(params).forEach((key: any, index: number) => {
      let values
      if (typeof params[key] === "object") {
        values = params[key]?.map((e: any) => `'${e}'`)
      } else {
        values = `'${params[key]}'`
      }
      query += `"${key}" IN (${values.join(", ")}) ${index == Object.keys(params).length - 1 ? "" : "OR"} `
    })
    if (query) return `WHERE ${query}`
    return ''
  }
}