const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    // fs.promises.writeFile(archivo, "");
  }
  async save(objeto) {
    try {
      let datosGuardados = await fs.promises.readFile(this.archivo, "utf-8");
      if (datosGuardados.length === 0) {
        objeto.id = 1;
        await fs.promises.writeFile(this.archivo, JSON.stringify([objeto]));
      } else {
        datosGuardados = JSON.parse(datosGuardados);
        objeto.id = datosGuardados.length + 1;
        datosGuardados.push(objeto);
        await fs.promises.writeFile(
          this.archivo,
          JSON.stringify(datosGuardados)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      let datosGuardados = await fs.promises.readFile(this.archivo, "utf-8");
      datosGuardados = JSON.parse(datosGuardados);
      let objetoDos = datosGuardados.find(
        (producto) => producto.id === id
      );
      if (objetoDos) {
        console.log(objetoDos);
        return objetoDos;
      } else {
        console.log(null);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      let datosGuardados = await fs.promises.readFile(this.archivo, "utf-8");
      datosGuardados = JSON.parse(datosGuardados);
      return datosGuardados;
    } catch (error) {
      console.log(error);
    }
  }
  async deletById(id) {
    try {
      let datosGuardados = await fs.promises.readFile(this.archivo, "utf-8");
      datosGuardados = JSON.parse(datosGuardados);
      datosGuardados = datosGuardados.filter((producto) => producto.id != id);
      fs.writeFileSync(this.archivo, JSON.stringify(datosGuardados));
      console.log(datosGuardados);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFileSync(this.archivo, "");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Contenedor