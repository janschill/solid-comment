export function emptyCommentTemplate () {
  return `
    <li class="sc-list__item sc-list__item--unavailable">
      <article class="sc-comment">
        <aside class="sc-comment__aside"></aside>
          <section>
           <p class="sc-comment__text sc-comment__text--unavailable">Comment is unavailable.</p>
           <details class="sc-details">
             <summary class="sc-summary">Why is this comment unavailable?</summary>
             <p class="sc-paragraph">This comment module is using a decentralized storage mechanism. This means that each individual comment is stored on a different machine. A user who wants to comment on this event needs a WebID and <a href="https://solidproject.org/users/get-a-pod" target="_blank">Solid pod</a>. The comments are then stored in the pods, which need to be fetched separately.</p>
             <p class="sc-paragraph">There can be many reasons for a comment to not load. Here are the most common possibilities:</p>
             <ol class="sc-ol">
               <li class="sc-li">The author of the comment deleted their comment.</li>
               <li class="sc-li">The author of the comment deleted their pod.</li>
               <li class="sc-li">The author of the comment restricted access to their pod or comment.</li>
               <li class="sc-li">The author’s pod provider is experiencing an outage. Try again later.</li>
               <li class="sc-li">The administrator of this website decided to delete the reference to the comment.</li>
               <li class="sc-li">The request to fetch the comment was interrupted by an outage. Please refresh your browser.</li>
             </ol>
          </details>
        </section>
      </article>
    </li>
  `
}
