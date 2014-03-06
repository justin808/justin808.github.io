# Put me into the plugins directory
# http://labs.opinsys.com/blog/2012/11/02/hello-labs-and-how-to-use-livereload-with-octopress/
module Jekyll
  class Site

    alias orig_process process
    def process
      start = Time.now
      puts "Generating site..."

      orig_process

      puts "Generation done. Took #{ Time.now - start } seconds"

      File.open "public/generated", "w" do |f|
        f.write(Time.now.to_s)
      end
    end
  end
end
