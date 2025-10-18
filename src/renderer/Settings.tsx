import * as React from 'react'
import {
  SettingsContainer,
  SettingsHeader,
  SettingsTitle,
  BackButton,
  SettingsSection,
  SectionTitle,
  SettingItem,
  SettingLabel,
  SettingDescription,
  ActionButton,
  FAQContainer,
  FAQItem,
  FAQQuestion,
  FAQAnswer,
} from './settingsStyles'

interface SettingsProps {
  onBack: () => void
  onShowOnboarding: () => void
}

const Settings: React.FC<SettingsProps> = ({ onBack, onShowOnboarding }) => {
  return (
    <div style={{ minHeight: '100vh', width: '100%', background: '#1a1a1a' }}>
      <SettingsContainer>
        <SettingsHeader>
          <BackButton onClick={onBack}>← Back</BackButton>
          <SettingsTitle>Settings</SettingsTitle>
        </SettingsHeader>

        {/* Onboarding Settings */}
        <SettingsSection>
          <SectionTitle>Help & Support</SectionTitle>
          <SettingItem>
            <div>
              <SettingLabel>First Setup Information</SettingLabel>
              <SettingDescription>
                View the initial setup guide again
              </SettingDescription>
            </div>
            <ActionButton onClick={onShowOnboarding}>
              Show Setup Guide
            </ActionButton>
          </SettingItem>
        </SettingsSection>

        {/* FAQ Section */}
        <SettingsSection>
          <SectionTitle>FAQ</SectionTitle>
          <FAQContainer>
            <FAQItem>
              <FAQQuestion>What do I need to run this app?</FAQQuestion>
              <FAQAnswer>
                To successfully run this application, you need:
                <ul>
                  <li>
                    <strong>VPN Connection:</strong> The VPN must be running and
                    connected
                  </li>
                  <li>
                    <strong>Box-Content-Service:</strong> The
                    Box-Content-Service should be healthy and accessible
                  </li>
                  <li>
                    <strong>Initial Setup:</strong> Complete all first-time
                    setup configurations and ensure you have the necessary
                    access permissions
                  </li>
                </ul>
                <p>
                  For more detailed information, please refer to our{' '}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      window.electronAPI.openExternal(
                        'https://github.com/bolognini/goodchop-menu-replacement/blob/main/INSTALL.md'
                      )
                    }}
                  >
                    Setup Guide
                  </a>
                  .
                </p>
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>
                How long does it take for it to generate the CSV files?
              </FAQQuestion>
              <FAQAnswer>
                It takes approximately 10 minutes to generate the CSV files for
                a single week. If you are running multiple weeks, it will take
                longer. This depends on the number of recipes in the week and
                how much swapping you are doing. There is a 30 minute timeout
                for the CSV generation. If it takes longer, the app will timeout
                and the CSV files will not be generated. The app will
                automatically retry the CSV generation if it fails. If it fails
                after 20 retries, the app will timeout and the CSV files will
                not be generated.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>
                It timed out or it didn't work as expected. What should I do?
              </FAQQuestion>
              <FAQAnswer>
                If it timed out, it is likely because there is a ton of swapping
                going on. We recommend asking support for Good Chop team to run
                the commands manually. This app is still in proof of concept
                phase, so we are not able to support it fully. If it didn't work
                as expected, you can reach out to the Good Chop team to help
                assessing the issue. It might be an authentication issue, a pod
                connection issue, or a command issue.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>
                Can it run other Box-Content-Service commands?
              </FAQQuestion>
              <FAQAnswer>
                No, it can only run basic commands to replace recipe indexes we
                are often asked to do, such as swapping indexes 10 to 109 for
                weeks 13 to 15, including multi-week selection.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>Is this available for other markets?</FAQQuestion>
              <FAQAnswer>
                Currently not. This is a proof of concept for the Good Chop
                team. However, after it proves successful to Good Chop needs, we
                will consider making it available to other markets, if requested
                by other teams.
              </FAQAnswer>
            </FAQItem>
          </FAQContainer>
        </SettingsSection>
      </SettingsContainer>
    </div>
  )
}

export default Settings
