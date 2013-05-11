#
## From http://www.ewal.net/2012/09/08/octopress-customizations/
## Modified to have default flag of true to include drafts
#desc "Rename files in the posts directory if the filename does not match the post date in the YAML front matter. Note, URLs based on 'date' metadata, so this shouldn't break any links"
#task :redate_posts do
#  redate_posts true, source_dir, posts_dir, org_posts_dir
#end
#
#desc "Rename files in the posts directory, skipping drafts, if the filename does not match the post date in the YAML front matter. Note, URLs based on 'date' metadata, so this shouldn't break any links"
#task :redate_posts_no_drafts do
#  redate_posts false, source_dir, posts_dir, org_posts_dir
#end
#
#def redate_posts include_drafts, source_dir, posts_dir, org_posts_dir
#  redate_posts_in_dir "#{source_dir}/#{posts_dir}", "markdown", include_drafts
#  # remove next line if you're you're not using org-mode
#  redate_posts_in_dir "#{source_dir}/#{org_posts_dir}", "org", include_drafts
#
#end
#
#def redate_posts_in_dir dir, ext, include_drafts = true
#  Dir.chdir(dir) do
#    Dir["*.#{ext}"].each do |post|
#      post_date = ""
#      File.open(post) do |f|
#        f.grep(/^date: /) do |line|
#          post_date = line.gsub(/date: /, "").gsub(/\s.*$/, "")
#          break
#        end
#      end
#      post_title    = post.to_s.gsub(/\d{4}-\d{2}-\d{2}/, "") # Get the post title from the currently processed post
#      new_post_name = post_date + post_title                  # determing the correct filename
#      rename        = post != new_post_name
#      next unless rename
#      unless include_drafts
#        is_draft = false
#        File.open(post) do |f|
#          f.grep(/^published: false/) do |line|
#            is_draft = true
#            break
#          end
#        end
#        next if is_draft
#      end
#      puts "renaming #{post} to #{new_post_name}"
#      FileUtils.mv(post, new_post_name)
#    end
#  end
#end
#
#
#
