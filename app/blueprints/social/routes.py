
from . import bp as social
from flask import render_template, flash, url_for, redirect, request
from app.models import User, Post
from flask_login import current_user, login_required


@social.route('/home', methods=['GET', 'POST'])
@login_required
def index():
    if request.method == 'POST':
        body = request.form.get('body')

        new_post = Post(body=body, user_id = current_user.id)
        # new_post = Post()
        # new_post.edit(body)
        # current_user.posts.append(new_post)

        new_post.save()
        flash('Thanks for your piece of mind!','success')
        return redirect(url_for('social.index'))
    posts = current_user.followed_posts()
    return render_template('index.html', posts=posts)

@social.route('/delete_post/<int:id>')
@login_required
def delete_post(id):
    # Get post with the id of id the from the database
    post = Post.query.get(id)   
    # See if the user is author of post
    if post and post.author.id != current_user.id:
        flash('GTFO You silly Wanna B Hakker', 'danger')
        return redirect(url_for('social.index'))
        # Delete the post
    post.delete()
        # Give feeback to the user
    flash("You have removed the evidence; You should not be Cancelled anymore!","primary")
    # Send them back from whence they came
    return redirect(request.referrer or url_for('social.index'))

@social.route('/edit_post/<int:id>', methods=['GET', 'POST'])
@login_required
def edit_post(id):
    # Get post with the id of id the from the database
    post = Post.query.get(id)
        # Check to see if the post belongs to the curent user
    if post and post.author.id != current_user.id:
        flash('GTFO You silly Wanna B Hakker', 'danger')
        return redirect(url_for('social.index'))
    # if its a post
    if request.method == 'POST':
        # Edit the post with the new infomation from the form
        post.edit(request.form.get('body'))
        post.save()
        # Feedback
        flash('Your post has been edited', 'success')
        # Send them back edit post page
        return redirect(url_for('social.my_posts'))
    # show the the edit post page
    return render_template('edit_post.html.j2',post=post)



@social.route('/show_users')
@login_required
def show_users():
    users = User.query.filter(User.id != current_user.id).all()
    return render_template('show_users.html.j2', users=users)

@social.route('/follow/<int:id>')
@login_required
def follow(id):
    user_to_follow = User.query.get(id)
    current_user.follow(user_to_follow)
    flash(f"You are now following {user_to_follow.first_name} {user_to_follow.last_name}", "success")
    return redirect(url_for("social.show_users"))

@social.route('/unfollow/<int:id>')
@login_required
def unfollow(id):
    user_to_unfollow = User.query.get(id)
    current_user.unfollow(user_to_unfollow)
    flash(f"You are no longer following {user_to_unfollow.first_name} {user_to_unfollow.last_name}", "warning")
    return redirect(url_for("social.show_users"))

@social.route('/post/<int:id>')
@login_required
def get_a_post(id):
    post = Post.query.get(id)
    return render_template('single_post.html.j2', post=post, view_all=True)

@social.route('/post/my_posts')
@login_required
def my_posts():
    # posts = Post.query.filter_by(user_id = current_user.id).all()
    return render_template('my_posts.html.j2', posts=current_user.posts.all())