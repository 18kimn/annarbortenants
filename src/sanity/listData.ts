export const listDataProjection = `
  "associations": select(count(body[_type == "associationList"]) > 0 =>
    *[_type == "tenantAssociation"] | order(order asc) {
      _id, name, contactName, contactEmail, status
    }),
  "resourceCategories": select(count(body[_type == "resourceList"]) > 0 =>
    *[_type == "resourceCategory"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      "resources": *[_type == "resource" && category._ref == ^._id] | order(order asc) {
        _id, title, href, description
      }
    }),
  "pressMentions": select(count(body[_type == "pressMentionList"]) > 0 =>
    *[_type == "pressMention"] | order(date desc) {
      _id, title, publication, author, date, link
    }),
  "posts": select(count(body[_type == "postList"]) > 0 =>
    *[_type == "post"] | order(date desc) {
      _id, title, "slug": slug.current, date
    }),
  "faqItems": select(count(body[_type == "faqList"]) > 0 =>
    *[_type == "faqItem"] | order(order asc) {
      _id, question, answer
    })`
