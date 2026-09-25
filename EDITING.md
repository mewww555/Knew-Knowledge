# Edit Knew Knowledge

**Open your private editor and preview:** [Open Knew Knowledge in Codespaces](https://codespaces.new/mewww555/Knew-Knowledge?quickstart=1). Sign in to GitHub and choose **Create codespace** the first time, or **Resume this codespace** later. The first opening can take a few minutes. The site preview should open beside your files; if it doesn't, open the **Ports** tab and select the link for port **4000**.

## Change text

Use the file list on the left. Click a file, replace the words you want, then press **Ctrl+S** (Windows) or **Cmd+S** (Mac). Refresh the private preview to see the change. Nothing on your public site changes until you publish it.

| To change | Open this file |
| --- | --- |
| Home page introduction, question, and research list | `_data/home.yml` |
| About page paragraphs | `_data/about.yml` |
| Research page text | `research.md` |
| Field Notes page text | `field-notes.md` |
| Essays page text | `essays.md` |
| Albums listing page text | `albums.md` |
| JPEGMAFIA album analysis | `_albums/experimental-rap.md` |
| Welcome essay | `_posts/2026-09-19-welcome-to-knew-knowledge.md` |

In the two `.yml` files, change only the words **after** the names on the left, or the indented sentence below `>-`. Keep the existing indentation. Each line beginning with `-` in `research_interests` is one list item.

For a `.md` page, change the text **below** the second `---` line. Some pages have visible HTML such as `<p>your words</p>`: replace the words between the tags and leave the tags in place. For the album, the title, artist, and status at the top can also be edited by changing the words after each `:`.

## Publish when it looks right

Select the **Source Control** icon in the left sidebar (the branch symbol). Review the changed files, enter a short message such as `Update homepage text`, and select **Commit & Push** (or **Commit**, then **Sync Changes**). GitHub Pages will then update the public site at [Knew Knowledge](https://mewww555.github.io/Knew-Knowledge/). Until you push, your edits stay in your private codespace.

You can close the browser and resume the same codespace later using the editor link above. If the preview does not open, look for a build error in the **Terminal** panel at the bottom.
