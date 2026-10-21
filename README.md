# Jinming Zhang — portfolio

Static GitHub Pages version of the Squarespace portfolio. The site keeps the original home carousel, navigation, project listing, About, Blog, Contact and Donate content. Each project and published blog post has its own page.

## Included

- 12 published projects and 10 published Blog entries from the Squarespace export
- Home, About, Contact and Donate pages
- 314 local image assets; six oversized source images use Squarespace's resized web versions
- Responsive navigation and an interactive home carousel
- Two Squarespace drafts are omitted from the public pages

## Preview locally

Open `index.html` in a browser, or serve this folder with:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Publish on GitHub Pages

1. Create a new GitHub repository and add the contents of this folder to its root.
2. Open **Settings → Pages** for the repository.
3. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. GitHub will provide a site URL, usually `https://<username>.github.io/<repository>/`.

The links and image paths are relative, so the site works under a repository path without a custom domain. Keep Squarespace active until the GitHub Pages copy is checked. You can choose a custom domain later, but it is not required.

## Updating content

This is a static site with no editor or database. New projects can be added as a folder under `project/` with an `index.html` page and a card in `project/index.html`. Store new images in `images/` and use relative paths. The included `migration-manifest.json` lists imported project and blog slugs.
