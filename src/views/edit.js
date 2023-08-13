import { html } from "../../node_modules/lit-html/lit-html.js";
import { getBikeById, updateBikeById } from "../api/data.js";

const editTemplate = (a, onEdit) => html`
  <section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
              <form class="edit-form" @submit=${onEdit}>
                <input
                  type="text"
                  name="model"
                  id="model"
                  placeholder="Model"
                  value=${a.model}
                />
                <input
                  type="text"
                  name="imageUrl"
                  id="moto-image"
                  placeholder="Moto Image"
                  value=${a.imageUrl}
                />
                <input
                type="number"
                name="year"
                id="year"
                placeholder="Year"
                value=${a.year}
              />
              <input
              type="number"
              name="mileage"
              id="mileage"
              placeholder="mileage"
              value=${a.mileage}
            />
            <input
              type="number"
              name="contact"
              id="contact"
              placeholder="contact"
              value=${a.contact}
            />
              <textarea
                id="about"
                name="about"
                placeholder="about"
                rows="10"
                cols="50"
              >${a.about}</textarea>
                <button type="submit">Edit Motorcycle</button>
              </form>
          </div>
        </section>
`;

export async function showEdit(ctx) {

  const bike = await getBikeById(ctx.params.id);

  ctx.render(editTemplate(bike, onEdit));

  async function onEdit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log("data", data);

    if (
      !data.model ||
      !data.year ||
      !data.mileage ||
      !data.imageUrl ||
      !data.contact ||
      !data.about
    ) {
      return;
    }

    try {
      await updateBikeById(ctx.params.id, data);
        console.log(`ok`);
      ctx.page.redirect("/details/" + ctx.params.id);
    } catch (err) {
      console.log(err.message);
    }
  }
}