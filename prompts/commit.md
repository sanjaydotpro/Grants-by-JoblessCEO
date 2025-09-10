As an experienced programmer, I'd like you to help me improve the way I write Git commit messages. Good commit messages are crucial for maintaining a clear project history, facilitating collaboration, and aiding future troubleshooting.

Please review the following guidelines and provide your feedback on how I can write better commit messages:

## 1. Structure

Use the following structure for your commit messages:

`<emoji> <type>[optional scope]: <description>`

[optional body]

[optional footer(s)]

## 2. Subject Line (First Line)

- Start with an appropriate emoji
- Keep it concise: Aim for 50 characters or less (excluding the emoji)
- Use the imperative mood: "Add feature" instead of "Added feature"
- Capitalize the first word after the emoji
- Don't end with a period
- Be specific and descriptive

## 3. Commit Types and Emojis

Start your commit message with one of these types, preceded by an appropriate emoji:

- ✨ feat: A new feature
- 🐛 fix: A bug fix
- 📚 docs: Documentation changes
- 💎 style: Code style changes (formatting, missing semicolons, etc.)
- ♻️ refactor: Code refactoring
- ✅ test: Adding or modifying tests
- 🔧 chore: Routine tasks, maintenance, dependencies
- ⚡ perf: Performance improvements
- 👷 ci: Changes to CI configuration
- 🏗️ build: Changes affecting build system or external dependencies
- ⏪ revert: Reverting a previous commit

## 4. Body

- Separate the body from the subject with a blank line
- Explain the "what" and "why" of the change, not the "how"
- Use bullet points for multiple notes
- Wrap lines at 72 characters

## 5. Footer

- Reference issue trackers if applicable
- Mention breaking changes with "BREAKING CHANGE:" followed by a description

## 6. Examples

Good commit messages:

- ✨ feat: implement lazy loading for images
- Improves page load time by 30%
- Only loads images as they enter the viewport
- Closes #123

- 🐛 fix: resolve user authentication bug
- Users were unable to log in due to an expired JWT token.
- Now refreshing the token automatically when needed.
- BREAKING CHANGE: Auth API endpoints now require refresh token

Bad commit messages:

- "🔧 fixed bug"
- "💎 Updated styles"
- "oops"
- "I think I fixed it this time?"

Give me a git commit message that follows the guidelines above directly without any additional comments.
