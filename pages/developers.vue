<template>
  <div>
    <section class="pt-24">
      <div class="container">
        <h1
          class="text-3xl font-bold text-center md:text-4xl lg:text-5xl text-pretty"
        >
          Developers
        </h1>
        <p
          class="max-w-2xl mx-auto mt-2 text-lg leading-loose text-center text-light-text dark:text-dark-light-text"
        >
          The Complete SMS API and Documentation
        </p>
      </div>
    </section>

    <section class="pt-24 pb-16">
      <div class="container">
        <p
          class="max-w-5xl mx-auto leading-loose text-center text-light-text dark:text-dark-light-text"
        >
          With our developers’ API, you can integrate bulk SMS into your website
          or any application that has http request enabled and XML (optional).
          The advantages this has to offer is ever increasing and makes bulk SMS
          available to you from any programming language of your choice, whether
          its a Visual Basic Program, .Net, PHP, JAVA or any language of your
          choice. All you need to get started is our API documentation. You can
          have this set up in no time as we have provided options for different
          methods of connection.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-5 mt-5">
          <nuxt-link
            to="/MultiTexter_HTTP_SMS_API 2.0.pdf"
            external
            class="btn-primary"
          >
            Get API Documentation
          </nuxt-link>
          <nuxt-link
            to="https://documenter.getpostman.com/view/2209864/TzzGFY4f"
            external
            target="_blank"
            class="btn-outline"
          >
            Click Here for More
          </nuxt-link>
        </div>
        <p
          class="max-w-5xl mx-auto mt-5 leading-loose text-center text-light-text dark:text-dark-light-text"
        >
          We currently provide programming support for API integration using the
          PHP programming language for free and for those who do not have
          programming skills, so you can be sure to get up and running very
          quickly. Visual Basic Support: Integration is also available for
          Visual Basic 6 applications for a free. Please contact our support
          team if you have any problems during integration by sending an email
          to
          <a
            class="text-sm font-bold text-primary"
            href="mailto:developer@multitexter.com"
          >
            developer@multitexter.com
          </a>
        </p>
      </div>
    </section>

    <section class="pb-16">
      <div class="container">
        <div class="prism">
          <h2 class="font-bold">Javascript Sample Code</h2>
          <pre class="line-numbers language-js">
            <code>
              const url = 'https://app.multitexter.com/v2/app/sendsms';

              // The data we are going to send in our request
              let data = { name: 'Sara' } 

              // The parameters we are gonna pass to the fetch function
              let fetchData = { 
                method: 'POST', 
                body: data, 
                headers: new Headers() 
              }

              fetch(url, fetchData)
              .then(function() {
                // Handle response you get from the server
              });
              .catch(e) {
                // Handle error
              }
            </code>
          </pre>
        </div>

        <div class="mt-10 prism">
          <h2 class="font-bold">PHP Sample Code</h2>
          <pre class="line-numbers language-php">
            <code>
              &lt;?php

                $email = "your multitexter registered email ";
                $password = "Your password";
                $message = "message content";
                $sender_name = "Your sender name";
                $recipients = "mobile numbers seperated by comma e.9 2348028828288,234900002000,234808887800";
                $forcednd = "set to 1 if you want DND numbers to ";

                $data = array("email" => $email, "password" => $password,"message"=>$message, "sender_name"=>$sender_name,"recipients"=>$recipients,"forcednd"=>$forcednd);
                $data_string = json_encode($data);
                $ch = curl_init('https://app.multitexter.com/v2/app/sms');
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
                curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Content-Length: ' . strlen($data_string)));
                $result = curl_exec($ch);
                $res_array = json_decode($result);
                print_r($res_array);
              ?>
            </code>
          </pre>
        </div>

        <div class="mt-10 prism">
          <h2 class="font-bold">Java Sample Code</h2>
          <pre class="line-numbers language-java">
            <code>
              import java.net.*;
                import java.io.*;
                import java.util.*;

                public class Main {
                  public static void main (String[]args) {
                    try {
                      String query = "https://app.multitexter.com/v2/app/sms";
                      String email = "your multitexter registered email ";
                      String password = "Your password";
                      String message = "message content";
                      String sender_name = "Your sender name";
                      String recipients = "mobile numbers seperated by comma e.9 2348028828288,234900002000,234808887800";
                      String forcednd = "set to 1 if you want DND numbers to ";
                      String param = "{\"email\":\""+email+"\",\"password\":\""+password+"\",\"message\":\""+message+"\",\"sender_name\":\""+sender_name+"\",\"recipients\":\""+recipients+"\",\"forcednd\":\""+forcednd+"\"}";

                      URL url = new URL (query);
                      HttpURLConnection conn = (HttpURLConnection) url.openConnection ();
                      conn.setConnectTimeout (5000);
                      conn.setRequestProperty ("Content-Type",
                      "application/json; charset=UTF-8");
                      conn.addRequestProperty ("User-Agent",
                      "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:25.0) Gecko/20100101 Firefox/25.0");
                      conn.setDoOutput (true);
                      conn.setDoInput (true);
                      conn.setRequestMethod ("POST");

                      OutputStream os = conn.getOutputStream ();
                      os.write (param.getBytes ("UTF-8"));
                      os.close ();

                      // read the response
                      // InputStream in = new BufferedInputStream(conn.getInputStream());
                      // String result = org.apache.commons.io.IOUtils.toString(in, "UTF-8");

                      BufferedReader in = new BufferedReader (new InputStreamReader (conn.getInputStream ()));
                      String inputLine;
                      StringBuffer response = new StringBuffer ();

                      while ((inputLine = in.readLine ()) != null) {
                        response.append (inputLine);
                      }

                      in.close ();
                      conn.disconnect ();

                      System.out.println(response)  ;
                      } catch (Exception e) {
                        System.out.println (e.toString ());
                      }
                    }
                  }
                }
            </code>
          </pre>
        </div>

        <div class="mt-10 prism">
          <h2 class="font-bold">C# Sample Code</h2>
          <pre class="line-numbers language-csharp">
            <code>
                using System;

                using System.Net;
                using System.IO;

                namespace Rextester {
                  public class Program {
                    public static void Main(string[] args) {
                      var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://app.multitexter.com/v2/app/sms");
                      httpWebRequest.ContentType = "application/json";
                      httpWebRequest.Method = "POST";
                      ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;

                      using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream())) {
                        string email = "your multitexter registered email ";
                        string password = "Your password";
                        string message = "message content";
                        string sender_name = "Your sender name ";
                        string recipients = "mobile numbers seperated by comma e.9 2348028828288,234900002000,234808887800";
                        string forcednd = "set to 1 if you want DND numbers to receive message otherwise set to zero";
                        string json = "{\"email\":\""+email+"\",\"password\":\""+password+"\",\"message\":\""+message+"\",\"sender_name\":\""+sender_name+"\",\"recipients\":\""+recipients+"\",\"forcednd\":\""+forcednd+"\"}";
                        streamWriter.Write(json);
                        streamWriter.Flush();
                        streamWriter.Close();
                      }

                      var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                      using (var streamReader = new StreamReader(httpResponse.GetResponseStream())) {
                        var result = streamReader.ReadToEnd();
                        Console.WriteLine(result);
                      }
                    }
                  }
                }
            </code>
          </pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { highlightAll } from 'prismjs'

import 'prismjs/themes/prism.min.css'

// Include a theme
import 'prismjs/themes/prism-tomorrow.css'

import 'prismjs/components/prism-markup-templating.js'

// Include language support
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-java'

// Include the line numbers plugin
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

// Include the toolbar plugin
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/toolbar/prism-toolbar.css'

// Include some other plugins
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords'
import 'prismjs/plugins/show-language/prism-show-language'
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace'

onMounted(() => {
  highlightAll()
})

useHead({
  title: 'Multitexter BulkSMS - Developers',
})
</script>
