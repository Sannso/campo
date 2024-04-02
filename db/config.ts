import { defineDb, column, defineTable } from 'astro:db';


// User Sesion Tables
export const Users = defineTable({
  columns:{
    id: column.text({primaryKey:true, optional:false, unique:true}), // Puede tener optional:false, unique: true
    email: column.text(),
    password: column.text(),
  }
})

export const Sessions = defineTable({
  columns:{
    id: column.text({optional:false, unique:true}),
    userId: column.text({optional:false, references: () => Users.columns.id}),
    expiresAt: column.number({optional:false})
  }
})


// User Personal Info
export const PersonalInfo = defineTable({
  columns:{
    id: column.text({primaryKey: true, optional:false, unique:true}),
    userID: column.text({references: () => Users.columns.id}),
    name: column.text(),
    firstName: column.text(),
    lastName: column.text(),
    type: column.text(), // Solo Agricultor, Productor, Ambos
    cellphone: column.number(),
    cpIndicator: column.number()
  }
})



// https://astro.build/db/config
export default defineDb({
  tables: { }
});
