import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteBikeById,
  getBikeById,
  getAllLikesByBikeId,
  getAllLikesByBikeIdAndUserId,
  likeBikeById,
} from "../api/data.js";

const detailsTemplate = (a, likes, user, isAlreadyLiked, onDelete, onLike) => {
  const isCreator = a._ownerId === user?._id;

  return html`
  <section id="details">
  <div id="details-wrapper">
    <img id="details-img" src="${a.imageUrl}" alt="example1" />
    <p id="details-title">${a.model}</p>
    <div id="info-wrapper">
      <div id="details-description">
        <p class="year">Year: ${a.year}</p>
        <p class="mileage">Mileage: ${a.milage} km.</p>
        <p class="contact">Contact Number: ${a.contact}</p>
           <p id = "motorcycle-description">${a.about}</p>
      </div>
        ${user
          ? html`
              <div id="action-buttons">
                ${!isCreator && !isAlreadyLiked
                  ? html``
                  //<a href="" id="like-btn" @click=${onLike}>Like</a>
                  : nothing}
                ${isCreator
                  ? html`
                      <a href="/edit/${a._id}" id="edit-btn">Edit</a>
                      <a href="" id="delete-btn" @click=${onDelete}>Delete</a>
                    `
                  : nothing}
              </div>
            `
          : nothing}
      </div>
    </section>
  `;
};

export async function showDetails(ctx) {

  const bikeId = ctx.params.id;

  const bike = await getBikeById(bikeId);

  const likes = 0;

  let isAlreadyLiked = false;



  ctx.render(
    detailsTemplate(bike, likes, ctx.user, isAlreadyLiked, onDelete, onLike)
  );

  async function onLike() {
    try {
      //likeBikeById({ bikeId: bike._id });
      console.log(`liked`);

      ctx.page.redirect("/details/" + bikeId);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function onDelete() {
    try {
      await deleteBikeById(bikeId);

      ctx.page.redirect("/dashboard");
    } catch (err) {
      console.log(err.message);
    }
  }
}