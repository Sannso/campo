import { defineTable, column } from 'astro:db';

export const Users = defineTable({
    columns:{
      id: column.number({primaryKey:true}),
      mail: column.text(),
      password: column.text(),
    }
  })
  
export const Sessions = defineTable({
    columns:{
      id: column.number({primaryKey: true}),
      userID: column.number({references: () => Users.columns.id}),
      expiresAt: column.number()
    }
  })