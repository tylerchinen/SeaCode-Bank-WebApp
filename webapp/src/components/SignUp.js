import React from 'react';
import { NavLink } from 'react-router-dom';
//import { connect } from 'react-redux';
import { Container, Segment, Header, Grid, Form, Button, Message, Divider, Modal, Image } from 'semantic-ui-react';
import Redirect from 'react-router-dom/es/Redirect';
//import { createUser } from '../users';

export default class SignUp extends React.Component {
  state = {
    open: false,
    Agree: false,
    accountNumber: '',
    password: '',
    confirmPassword: '',
    email: '',
    accountNumberError: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
    formError: false,
    createUserError: false
  }

  handleCheckboxChange = (e, { checked, name }) =>
      this.setState({ [name]: checked })

  open = () => this.setState({ open: true})
  close = () => this.setState({open: false})

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let error = false;

    if (this.state.email === '') {
      this.setState({ emailError: true });
      error = true;
    } else {
      this.setState({ emailError: false });
    }

    if (this.state.password.length < 5) {
      this.setState({ passwordError: true });
      error = true;
    } else {
      this.setState({ passwordError: false });
    }

    if (this.state.confirmPassword.length < 5) {
      this.setState({ confirmPasswordError: true });
      error = true;
    } else {
      this.setState({ confirmPasswordError: false });
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ passwordMatchError: true });
      error = true;
    } else {
      this.setState({ passwordMatchError: false });
    }

    this.setState({ formError: false });

    const user = {
      accountNumber: this.state.accountNumber,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.confirmPassword,
    };
    /*
            this.props.createUser(user)
                .then((res) => {
                  if (!res.payload) {
                    this.setState({
                      createUserError: true
                    });
                  }
                });

            if (this.state.loggedIn) {
              this.setState({ modalOpen: false });
            } */
  }
/*
  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })
*/
  // eslint-disable-next-line class-methods-use-this
  render() {
    const {
      Agree, open
    } = this.state

    return !this.props.loggedIn ? (
        <Container textAlign='center' fluid style={{
          // eslint-disable-next-line max-len
          backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&w=1000&q=80)',
          height: '100vh',
          backgroundSize: 'cover',
        }}>
          <Header style={{ paddingTop: '10px' }} as='h1'>Sign Up</Header>
          <Grid textAlign='center' style={{ height: '200vh' }}>
            <Grid.Column style={{ maxWidth: 800 }}>
              <Form size='large' onSubmit={(event) => {
                this.handleSubmit(event);
              }} error={this.state.createUserError || this.state.formError}>
                {this.state.createUserError ?
                    <Message error header="Account Already Exists"
                             content="An account already exists for thsi email address, please log in or confirm your email address is correct."
                    />
                    : null}

                <Segment>
                  <Grid columns='equal'>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Input focus placeholder='First Name'/>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Input focus placeholder='Last Name'/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Input focus
                                    placeholder='Account Number'
                                    name='accountNumber'
                                    value={this.state.accountNumber}
                                    onChange={this.handleInputChange}
                                    error={this.state.AccountNumberError}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Input fluid icon='user'
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                    error={this.state.emailError}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Divider/>
                      <Grid.Column>
                        <Form.Input fluid icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    name='password'
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    error={this.state.passwordError || this.state.passwordMatchError}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Divider/>
                      <Grid.Column>
                        <Form.Input fluid icon='lock'
                                    iconPosition='left'
                                    placeholder='Confirm Password'
                                    type='password'
                                    name='confirmPassword'
                                    value={this.state.confirmPassword}
                                    onChange={this.handleInputChange}
                                    error={this.state.confirmPasswordError || this.state.passwordMatchError}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Form.Group inline style={{ marginTop: '10px' }}>
                    <Form.Checkbox
                        checked={Agree}
                        label='I agree to the Terms and Conditions'
                        name='Agree'
                        onChange={this.handleCheckboxChange}
                    />
                    <Grid.Row>
                      <Modal open={open}
                             onOpen={this.open}
                             onClose={this.close}
                             trigger={<Button basic>View Terms and Conditions</Button>}
                             closeIcon >
                        <Modal.Content image>
                          <Image wrapped size='large' src='https://static.thenounproject.com/png/454567-200.png'/>
                          <Modal.Description>
                            <Header>Terms and Conditions and Privacy Policy</Header>
                            <h5>TERMS OF USE</h5>
                            <p>Last updated June 18, 2020</p>
                            <h5>AGREEMENT TO TERMS</h5>
                            <p>These Terms of Use constitute a legally binding agreement made between you, whether
                              personally or on behalf of an entity (“you”) and SeaBank ("Company", “we”, “us”, or
                              “our”), concerning your access to and use of the localhost:3000 website as well as any
                              other media form, media channel, mobile website or mobile application related, linked, or
                              otherwise connected thereto (collectively, the “Site”). You agree that by accessing the
                              Site, you have read, understood, and agreed to be bound by all of these Terms of Use. IF
                              YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM
                              USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.</p>
                            <p>Supplemental terms and conditions or documents that may be posted on the Site from time
                              to time are hereby expressly incorporated herein by reference. We reserve the right, in
                              our sole discretion, to make changes or modifications to these Terms of Use at any time
                              and for any reason. We will alert you about any changes by updating the “Last updated”
                              date of these Terms of Use, and you waive any right to receive specific notice of each
                              such change. It is your responsibility to periodically review these Terms of Use to stay
                              informed of updates. You will be subject to, and will be deemed to have been made aware of
                              and to have accepted, the changes in any revised Terms of Use by your continued use of the
                              Site after the date such revised Terms of Use are posted.</p>

                            <p>The information provided on the Site is not intended for distribution to or use by any
                              person or entity in any jurisdiction or country where such distribution or use would be
                              contrary to law or regulation or which would subject us to any registration requirement
                              within such jurisdiction or country. Accordingly, those persons who choose to access the
                              Site from other locations do so on their own initiative and are solely responsible for
                              compliance with local laws, if and to the extent local laws are applicable.</p>

                            <p>The Site is not tailored to comply with industry-specific regulations (Health Insurance
                              Portability and Accountability Act (HIPAA), Federal Information Security Management Act
                              (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use
                              this Site. You may not use the Site in a way that would violate the Gramm-Leach-Bliley Act
                              (GLBA).</p>

                            <p>The Site is intended for users who are at least 13 years of age. All users who are minors
                              in the jurisdiction in which they reside (generally under the age of 18) must have the
                              permission of, and be directly supervised by, their parent or guardian to use the Site. If
                              you are a minor, you must have your parent or guardian read and agree to these Terms of
                              Use prior to you using the Site.</p>


                            <h5>INTELLECTUAL PROPERTY RIGHTS</h5>

                            <p>Unless otherwise indicated, the Site is our proprietary property and all source code,
                              databases, functionality, software, website designs, audio, video, text, photographs, and
                              graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and
                              logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and
                              are protected by copyright and trademark laws and various other intellectual property
                              rights and unfair competition laws of the United States, international copyright laws, and
                              international conventions. The Content and the Marks are provided on the Site “AS IS” for
                              your information and personal use only. Except as expressly provided in these Terms of
                              Use, no part of the Site and no Content or Marks may be copied, reproduced, aggregated,
                              republished, uploaded, posted, publicly displayed, encoded, translated, transmitted,
                              distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever,
                              without our express prior written permission.</p>

                            <p>Provided that you are eligible to use the Site, you are granted a limited license to
                              access and use the Site and to download or print a copy of any portion of the Content to
                              which you have properly gained access solely for your personal, non-commercial use. We
                              reserve all rights not expressly granted to you in and to the Site, the Content and the
                              Marks.</p>


                            <h5>USER REPRESENTATIONS</h5>

                            <p>By using the Site, you represent and warrant that: (1) all registration information you
                              submit will be true, accurate, current, and complete; (2) you will maintain the accuracy
                              of such information and promptly update such registration information as necessary; (3)
                              you have the legal capacity and you agree to comply with these Terms of Use; (4) you are
                              not under the age of 13; (5) you are not a minor in the jurisdiction in which you reside,
                              or if a minor, you have received parental permission to use the Site; (6) you will not
                              access the Site through automated or non-human means, whether through a bot, script, or
                              otherwise; (7) you will not use the Site for any illegal or unauthorized purpose; and (8)
                              your use of the Site will not violate any applicable law or regulation.</p>

                            <p>If you provide any information that is untrue, inaccurate, not current, or incomplete, we
                              have the right to suspend or terminate your account and refuse any and all current or
                              future use of the Site (or any portion thereof).</p>


                            <h5>USER REGISTRATION</h5>

                            <p>You may be required to register with the Site. You agree to keep your password
                              confidential and will be responsible for all use of your account and password. We reserve
                              the right to remove, reclaim, or change a username you select if we determine, in our sole
                              discretion, that such username is inappropriate, obscene, or otherwise objectionable.</p>


                            <h5>PROHIBITED ACTIVITIES</h5>

                            <p>You may not access or use the Site for any purpose other than that for which we make the
                              Site available. The Site may not be used in connection with any commercial endeavors
                              except those that are specifically endorsed or approved by us.</p>

                            <h6>As a user of the Site, you agree not to:</h6>

                            <p>1. Trick, defraud, or mislead us and other users, especially in any attempt to learn
                              sensitive account information such as user passwords.</p>
                            <p>2. Circumvent, disable, or otherwise interfere with security-related features of the
                              Site, including features that prevent or restrict the use or copying of any Content or
                              enforce limitations on the use of the Site and/or the Content contained therein.</p>
                            <p>3. Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.</p>
                            <p>4. Use any information obtained from the Site in order to harass, abuse, or harm another
                              person.</p>
                            <p>5. Make improper use of our support services or submit false reports of abuse or
                              misconduct.</p>
                            <p>6. Use the Site to advertise or offer to sell goods and services.</p>
                            <p>7. Engage in unauthorized framing of or linking to the Site.</p>
                            <p>8. Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or
                              other material, including excessive use of capital letters and spamming (continuous
                              posting of repetitive text), that interferes with any party’s uninterrupted use and
                              enjoyment of the Site or modifies, impairs, disrupts, alters, or interferes with the use,
                              features, functions, operation, or maintenance of the Site.</p>
                            <p>9. Engage in any automated use of the system, such as using scripts to send comments or
                              messages, or using any data mining, robots, or similar data gathering and extraction
                              tools.</p>
                            <p>10. Delete the copyright or other proprietary rights notice from any Content.</p>
                            <p>11. Attempt to impersonate another user or person or use the username of another
                              user.</p>
                            <p>12. Sell or otherwise transfer your profile.</p>
                            <p>13. Upload or transmit (or attempt to upload or to transmit) any material that acts as a
                              passive or active information collection or transmission mechanism, including without
                              limitation, clear graphics interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or
                              other similar devices (sometimes referred to as “spyware” or “passive collection
                              mechanisms” or “pcms”).</p>
                            <p>14. Interfere with, disrupt, or create an undue burden on the Site or the networks or
                              services connected to the Site.</p>
                            <p>15. Harass, annoy, intimidate, or threaten any of our employees or agents engaged in
                              providing any portion of the Site to you.</p>
                            <p>16. Attempt to bypass any measures of the Site designed to prevent or restrict access to
                              the Site, or any portion of the Site.</p>
                            <p>17. Copy or adapt the Site’s software, including but not limited to Flash, PHP, HTML,
                              JavaScript, or other code.</p>
                            <p>18. Decipher, decompile, disassemble, or reverse engineer any of the software comprising
                              or in any way making up a part of the Site.</p>
                            <p>19. Except as may be the result of standard search engine or Internet browser usage, use,
                              launch, develop, or distribute any automated system, including without limitation, any
                              spider, robot, cheat utility, scraper, or offline reader that accesses the Site, or using
                              or launching any unauthorized script or other software.</p>
                            <p>20. Use a buying agent or purchasing agent to make purchases on the Site.</p>
                            <p>21. Make any unauthorized use of the Site, including collecting usernames and/or email
                              addresses of users by electronic or other means for the purpose of sending unsolicited
                              email, or creating user accounts by automated means or under false pretenses.</p>
                            <p>22. Use the Site as part of any effort to compete with us or otherwise use the Site
                              and/or the Content for any revenue-generating endeavor or commercial enterprise.</p>


                            <h5>USER GENERATED CONTRIBUTIONS</h5>

                            <p>The Site does not offer users to submit or post content. We may provide you with the
                              opportunity to create, submit, post, display, transmit, perform, publish, distribute, or
                              broadcast content and materials to us or on the Site, including but not limited to text,
                              writings, video, audio, photographs, graphics, comments, suggestions, or personal
                              information or other material (collectively, "Contributions"). Contributions may be
                              viewable by other users of the Site and through third-party websites. As such, any
                              Contributions you transmit may be treated in accordance with the Site Privacy Policy. When
                              you create or make available any Contributions, you thereby represent and warrant
                              that:</p>

                            <p>1. The creation, distribution, transmission, public display, or performance, and the
                              accessing, downloading, or copying of your Contributions do not and will not infringe the
                              proprietary rights, including but not limited to the copyright, patent, trademark, trade
                              secret, or moral rights of any third party.</p>
                            <p>2. You are the creator and owner of or have the necessary licenses, rights, consents,
                              releases, and permissions to use and to authorize us, the Site, and other users of the
                              Site to use your Contributions in any manner contemplated by the Site and these Terms of
                              Use.</p>
                            <p>3. You have the written consent, release, and/or permission of each and every
                              identifiable individual person in your Contributions to use the name or likeness of each
                              and every such identifiable individual person to enable inclusion and use of your
                              Contributions in any manner contemplated by the Site and these Terms of Use.</p>
                            <p>4. Your Contributions are not false, inaccurate, or misleading.</p>
                            <p>5. Your Contributions are not unsolicited or unauthorized advertising, promotional
                              materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of
                              solicitation.</p>
                            <p>6. Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing,
                              libelous, slanderous, or otherwise objectionable (as determined by us).</p>
                            <p>7. Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.</p>
                            <p>8. Your Contributions do not advocate the violent overthrow of any government or incite,
                              encourage, or threaten physical harm against another.</p>
                            <p>9. Your Contributions do not violate any applicable law, regulation, or rule.</p>
                            <p>10. Your Contributions do not violate the privacy or publicity rights of any third
                              party.</p>
                            <p>11. Your Contributions do not contain any material that solicits personal information
                              from anyone under the age of 18 or exploits people under the age of 18 in a sexual or
                              violent manner.</p>
                            <p>12. Your Contributions do not violate any applicable law concerning child pornography, or
                              otherwise intended to protect the health or well-being of minors;</p>
                            <p>13. Your Contributions do not include any offensive comments that are connected to race,
                              national origin, gender, sexual preference, or physical handicap.</p>
                            <p>14. Your Contributions do not otherwise violate, or link to material that violates, any
                              provision of these Terms of Use, or any applicable law or regulation.</p>

                            <p>Any use of the Site in violation of the foregoing violates these Terms of Use and may
                              result in, among other things, termination or suspension of your rights to use the
                              Site.</p>


                            <h5>CONTRIBUTION LICENSE</h5>

                            <p>You and the Site agree that we may access, store, process, and use any information and
                              personal data that you provide following the terms of the Privacy Policy and your choices
                              (including settings).</p>

                            <p>By submitting suggestions or other feedback regarding the Site, you agree that we can use
                              and share such feedback for any purpose without compensation to you.</p>

                            <p>We do not assert any ownership over your Contributions. You retain full ownership of all
                              of your Contributions and any intellectual property rights or other proprietary rights
                              associated with your Contributions. We are not liable for any statements or
                              representations in your Contributions provided by you in any area on the Site. You are
                              solely responsible for your Contributions to the Site and you expressly agree to exonerate
                              us from any and all responsibility and to refrain from any legal action against us
                              regarding your Contributions.</p>


                            <h5>SUBMISSIONS</h5>

                            <p>You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or
                              other information regarding the Site ("Submissions") provided by you to us are
                              non-confidential and shall become our sole property. We shall own exclusive rights,
                              including all intellectual property rights, and shall be entitled to the unrestricted use
                              and dissemination of these Submissions for any lawful purpose, commercial or otherwise,
                              without acknowledgment or compensation to you. You hereby waive all moral rights to any
                              such Submissions, and you hereby warrant that any such Submissions are original with you
                              or that you have the right to submit such Submissions. You agree there shall be no
                              recourse against us for any alleged or actual infringement or misappropriation of any
                              proprietary right in your Submissions.</p>


                            <h5>SITE MANAGEMENT</h5>

                            <p>We reserve the right, but not the obligation, to: (1) monitor the Site for violations of
                              these Terms of Use; (2) take appropriate legal action against anyone who, in our sole
                              discretion, violates the law or these Terms of Use, including without limitation,
                              reporting such user to law enforcement authorities; (3) in our sole discretion and without
                              limitation, refuse, restrict access to, limit the availability of, or disable (to the
                              extent technologically feasible) any of your Contributions or any portion thereof; (4) in
                              our sole discretion and without limitation, notice, or liability, to remove from the Site
                              or otherwise disable all files and content that are excessive in size or are in any way
                              burdensome to our systems; and (5) otherwise manage the Site in a manner designed to
                              protect our rights and property and to facilitate the proper functioning of the Site.</p>


                            <h5>PRIVACY POLICY</h5>

                            <p>We care about data privacy and security. By using the Site, you agree to be bound by our
                              Privacy Policy posted on the Site, which is incorporated into these Terms of Use. Please
                              be advised the Site is hosted in the United States. If you access the Site from any other
                              region of the world with laws or other requirements governing personal data collection,
                              use, or disclosure that differ from applicable laws in the United States, then through
                              your continued use of the Site, you are transferring your data to the United States, and
                              you agree to have your data transferred to and processed in the United States. Further, we
                              do not knowingly accept, request, or solicit information from children or knowingly market
                              to children. Therefore, in accordance with the U.S. Children’s Online Privacy Protection
                              Act, if we receive actual knowledge that anyone under the age of 13 has provided personal
                              information to us without the requisite and verifiable parental consent, we will delete
                              that information from the Site as quickly as is reasonably practical.</p>


                            <h5>TERM AND TERMINATION</h5>

                            <p>These Terms of Use shall remain in full force and effect while you use the Site. WITHOUT
                              LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE
                              DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING
                              BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING
                              WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN
                              THESE TERMS OF USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR
                              PARTICIPATION IN THE SITE OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU
                              POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.</p>

                            <p>If we terminate or suspend your account for any reason, you are prohibited from
                              registering and creating a new account under your name, a fake or borrowed name, or the
                              name of any third party, even if you may be acting on behalf of the third party. In
                              addition to terminating or suspending your account, we reserve the right to take
                              appropriate legal action, including without limitation pursuing civil, criminal, and
                              injunctive redress.</p>


                            <h5>MODIFICATIONS AND INTERRUPTIONS</h5>

                            <p>We reserve the right to change, modify, or remove the contents of the Site at any time or
                              for any reason at our sole discretion without notice. However, we have no obligation to
                              update any information on our Site. We also reserve the right to modify or discontinue all
                              or part of the Site without notice at any time. We will not be liable to you or any third
                              party for any modification, price change, suspension, or discontinuance of the Site.</p>

                            <p>We cannot guarantee the Site will be available at all times. We may experience hardware,
                              software, or other problems or need to perform maintenance related to the Site, resulting
                              in interruptions, delays, or errors. We reserve the right to change, revise, update,
                              suspend, discontinue, or otherwise modify the Site at any time or for any reason without
                              notice to you. You agree that we have no liability whatsoever for any loss, damage, or
                              inconvenience caused by your inability to access or use the Site during any downtime or
                              discontinuance of the Site. Nothing in these Terms of Use will be construed to obligate us
                              to maintain and support the Site or to supply any corrections, updates, or releases in
                              connection therewith.</p>


                            <h5>GOVERNING LAW</h5>

                            <p>These Terms of Use and your use of the Site are governed by and construed in accordance
                              with the laws of the State of Hawaii applicable to agreements made and to be entirely
                              performed within the State of Hawaii, without regard to its conflict of law
                              principles.</p>


                            <h5>CORRECTIONS</h5>
                            <p>There may be information on the Site that contains typographical errors, inaccuracies, or
                              omissions, including descriptions, pricing, availability, and various other information.
                              We reserve the right to correct any errors, inaccuracies, or omissions and to change or
                              update the information on the Site at any time, without prior notice.</p>


                            <h5>DISCLAIMER</h5>

                            <p>THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE
                              SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW,
                              WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE
                              THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
                              FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS
                              ABOUT THE ACCURACY OR COMPLETENESS OF THE SITE’S CONTENT OR THE CONTENT OF ANY WEBSITES
                              LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS,
                              MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY
                              DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SITE, (3)
                              ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL
                              INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION
                              OF TRANSMISSION TO OR FROM THE SITE, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE
                              WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS
                              OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED
                              AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA
                              THE SITE. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT
                              OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SITE, ANY HYPERLINKED
                              WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING,
                              AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION
                              BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF
                              A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST
                              JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.</p>


                            <h5>LIMITATIONS OF LIABILITY</h5>

                            <p>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD
                              PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE
                              DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM
                              YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>


                            <h5>INDEMNIFICATION</h5>

                            <p>You agree to defend, indemnify, and hold us harmless, including our subsidiaries,
                              affiliates, and all of our respective officers, agents, partners, and employees, from and
                              against any loss, damage, liability, claim, or demand, including reasonable attorneys’
                              fees and expenses, made by any third party due to or arising out of: (1) use of the Site;
                              (2) breach of these Terms of Use; (3) any breach of your representations and warranties
                              set forth in these Terms of Use; (4) your violation of the rights of a third party,
                              including but not limited to intellectual property rights; or (5) any overt harmful act
                              toward any other user of the Site with whom you connected via the Site. Notwithstanding
                              the foregoing, we reserve the right, at your expense, to assume the exclusive defense and
                              control of any matter for which you are required to indemnify us, and you agree to
                              cooperate, at your expense, with our defense of such claims. We will use reasonable
                              efforts to notify you of any such claim, action, or proceeding which is subject to this
                              indemnification upon becoming aware of it.</p>


                            <h5>USER DATA</h5>

                            <p>We will maintain certain data that you transmit to the Site for the purpose of managing
                              the performance of the Site, as well as data relating to your use of the Site. Although we
                              perform regular routine backups of data, you are solely responsible for all data that you
                              transmit or that relates to any activity you have undertaken using the Site. You agree
                              that we shall have no liability to you for any loss or corruption of any such data, and
                              you hereby waive any right of action against us arising from any such loss or corruption
                              of such data.</p>

                            <h5>ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h5>

                            <p>Visiting the Site, sending us emails, and completing online forms constitute electronic
                              communications. You consent to receive electronic communications, and you agree that all
                              agreements, notices, disclosures, and other communications we provide to you
                              electronically, via email and on the Site, satisfy any legal requirement that such
                              communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES,
                              CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND
                              RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SITE. You hereby waive any
                              rights or requirements under any statutes, regulations, rules, ordinances, or other laws
                              in any jurisdiction which require an original signature or delivery or retention of
                              non-electronic records, or to payments or the granting of credits by any means other than
                              electronic means.</p>


                            <h5>MISCELLANEOUS</h5>

                            <p>These Terms of Use and any policies or operating rules posted by us on the Site or in
                              respect to the Site constitute the entire agreement and understanding between you and us.
                              Our failure to exercise or enforce any right or provision of these Terms of Use shall not
                              operate as a waiver of such right or provision. These Terms of Use operate to the fullest
                              extent permissible by law. We may assign any or all of our rights and obligations to
                              others at any time. We shall not be responsible or liable for any loss, damage, delay, or
                              failure to act caused by any cause beyond our reasonable control. If any provision or part
                              of a provision of these Terms of Use is determined to be unlawful, void, or unenforceable,
                              that provision or part of the provision is deemed severable from these Terms of Use and
                              does not affect the validity and enforceability of any remaining provisions. There is no
                              joint venture, partnership, employment or agency relationship created between you and us
                              as a result of these Terms of Use or use of the Site. You agree that these Terms of Use
                              will not be construed against us by virtue of having drafted them. You hereby waive any
                              and all defenses you may have based on the electronic form of these Terms of Use and the
                              lack of signing by the parties hereto to execute these Terms of Use.</p>


                            <h5>CONTACT US</h5>

                            <p>In order to resolve a complaint regarding the Site or to receive further information
                              regarding use of the Site, please contact us at:</p>

                            <p>SeaBank</p>
                            <p>https://github.com/tylerchinen/SeaCode-Bank-WebApp</p>
                            <p>United States</p>

                            <h5>These terms of use were created using Termly’s Terms and Conditions Generator.</h5>
                            <Button floated='right' icon='close' content='Close' onClick={this.close} />
                          </Modal.Description>
                        </Modal.Content>
                      </Modal>
                    </Grid.Row>

                  </Form.Group>
                  {/* eslint-disable-next-line max-len */}
                  <Form.Button primary
                               color='teal'
                               center
                               size='large'
                               paddingTop={'30 px'}
                               type='submit'
                               disabled={!this.state.email
                               || !this.state.accountNumber
                               || !this.state.password
                               || !this.state.confirmPassword
                               }
                  >
                    Create Account
                  </Form.Button>
                </Segment>
              </Form>
              <Message>
                Already have an account? <a href='signin'>Sign In</a>
              </Message>
            </Grid.Column>
          </Grid>
        </Container>
    )
        :
        <Redirect to='/https://localhost:5000/api/users/register'/>;
  }
}

const mapStateToProps = state => ({ loggedIn:state.user.loggedIn});
//export default connect(mapStateToProps, { createUser })(SignUp);