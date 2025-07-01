# Auto Rebase Upstream Workflow

This GitHub Actions workflow automatically keeps your branch up to date with the upstream [arkade-os/wallet](https://github.com/arkade-os/wallet) repository by performing daily rebases.

## How It Works

### Schedule
- **Daily Execution**: Runs every day at 2:00 AM UTC
- **Manual Trigger**: Can be manually triggered via GitHub Actions UI

### Process Overview

1. **Check for Changes**: Compares your branch with upstream `master`
2. **Smart Rebase**: Only rebases if there are new upstream commits
3. **Conflict Handling**: Creates issues if conflicts occur during rebase
4. **Automatic Push**: Force-pushes rebased changes with `--force-with-lease` for safety
5. **Issue Management**: Automatically closes resolved conflict issues

## Features

### ✅ What It Does

- **Automatic Detection**: Only runs rebase when upstream has new changes
- **Safe Force Push**: Uses `--force-with-lease` to prevent data loss
- **Conflict Notification**: Creates GitHub issues when conflicts need manual resolution
- **Branch Agnostic**: Works with any branch the workflow runs on
- **Detailed Logging**: Provides comprehensive logs and summaries
- **Issue Cleanup**: Automatically closes resolved conflict issues

### 🔧 Smart Behavior

- **No Unnecessary Work**: Skips rebase if no upstream changes
- **Conflict Recovery**: Safely aborts failed rebases
- **Issue Deduplication**: Won't create duplicate conflict issues
- **Manual Resolution Guide**: Provides step-by-step conflict resolution instructions

## Workflow Configuration

### File Location
```
.github/workflows/auto-rebase-upstream.yml
```

### Key Settings
- **Upstream Repository**: `https://github.com/arkade-os/wallet.git`
- **Target Branch**: `master` (from upstream)
- **Permissions**: `contents: write` (for pushing changes)
- **Schedule**: `0 2 * * *` (2 AM UTC daily)

## Manual Trigger

You can manually trigger the workflow:

1. Go to **Actions** tab in your GitHub repository
2. Select **Auto Rebase Upstream** workflow
3. Click **Run workflow** button
4. Choose the branch and click **Run workflow**

## Conflict Resolution

When the workflow encounters conflicts, it will:

### Automatic Actions
1. **Abort Rebase**: Safely cancels the conflicted rebase
2. **Create Issue**: Opens a GitHub issue with resolution instructions
3. **Preserve History**: No commits are lost during the process

### Manual Resolution Required

If you receive a conflict notification issue:

```bash
# 1. Checkout your branch
git checkout your-branch-name

# 2. Add upstream remote (if not already added)
git remote add upstream https://github.com/arkade-os/wallet.git

# 3. Fetch latest changes
git fetch upstream

# 4. Start rebase
git rebase upstream/master

# 5. Resolve conflicts in your editor
# Edit conflicted files, remove conflict markers

# 6. Continue rebase
git add .
git rebase --continue

# 7. Force push rebased branch
git push --force-with-lease origin your-branch-name
```

### Common Conflict Areas

Based on your Telegram Mini App integration, watch for conflicts in:
- `src/index.tsx` - Provider hierarchy changes
- `src/App.tsx` - Component imports and structure
- `package.json` - Dependency management
- `index.html` - Script tag additions
- Configuration files - Build and development settings

## Monitoring

### GitHub Actions Logs
- View detailed execution logs in the **Actions** tab
- Each step provides specific information about the rebase process
- Summary section shows current status and any actions taken

### Issue Notifications
- Conflict issues are labeled with `auto-rebase-failed` and `automation`
- Issues include direct links to the failed workflow run
- Automatic closure when conflicts are resolved

### Workflow Summary
Each run provides a summary showing:
- Current branch name
- Whether upstream changes were detected
- Rebase success/failure status
- Links to relevant issues or workflow runs

## Safety Features

### Data Protection
- **`--force-with-lease`**: Prevents accidentally overwriting commits pushed by others
- **Full History Fetch**: Ensures complete git history for reliable rebases
- **Conflict Abortion**: Safely cancels problematic rebases without losing work

### Permission Management
- **Minimal Permissions**: Only requests `contents: write` permission
- **Bot Identity**: Uses GitHub Actions bot identity for commits
- **Token Security**: Uses built-in `GITHUB_TOKEN` (no custom tokens needed)

## Customization

### Change Schedule
Edit the cron expression in the workflow file:
```yaml
schedule:
  - cron: '0 2 * * *'  # 2 AM UTC daily
  # Examples:
  # - cron: '0 */6 * * *'    # Every 6 hours
  # - cron: '0 9 * * 1'      # Monday at 9 AM UTC
```

### Different Upstream Repository
Change the upstream URL in the workflow:
```yaml
git remote add upstream https://github.com/different-org/different-repo.git
```

### Target Different Branch
Modify the rebase command:
```bash
git rebase upstream/develop  # Instead of upstream/master
```

## Troubleshooting

### Workflow Not Running
- Check if GitHub Actions are enabled in repository settings
- Verify the workflow file is in the correct location
- Ensure the branch has the workflow file committed

### Permission Errors
- Confirm repository settings allow GitHub Actions to write
- Check if branch protection rules block the Actions bot
- Verify `GITHUB_TOKEN` has sufficient permissions

### Persistent Conflicts
- Manually resolve conflicts once to clear the backlog
- Consider if your changes are too divergent from upstream
- Review if some changes should be contributed back to upstream

## Best Practices

### For Telegram Mini App Development
1. **Keep Changes Focused**: Minimize conflicts by keeping feature changes isolated
2. **Regular Testing**: Test your app after each automatic rebase
3. **Monitor Issues**: Address conflict notifications promptly
4. **Upstream Contribution**: Consider contributing useful changes back to upstream

### Git Hygiene
1. **Clean History**: Keep your branch history clean before rebasing
2. **Atomic Commits**: Make small, focused commits that are easier to rebase
3. **Descriptive Messages**: Write clear commit messages for easier conflict resolution

## Integration with Telegram Mini App

This workflow is particularly valuable for your Telegram Mini App because:

- **Framework Updates**: Automatically receives updates to the base wallet framework
- **Security Patches**: Gets important security fixes from upstream
- **New Features**: Incorporates new wallet features that enhance your Mini App
- **Bug Fixes**: Automatically receives bug fixes from the main project

The workflow understands your Telegram-specific changes and provides targeted conflict resolution guidance for the files most likely to have issues.